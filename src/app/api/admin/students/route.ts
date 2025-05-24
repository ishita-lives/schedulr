import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

// Get all authorized students
export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const students = await prisma.authorizedStudent.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

// Add new authorized student
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      studentName, 
      grade, 
      enrolledClass,
      parentName,
      parentEmail,
      parentPhone
    } = body;

    // Validate all required fields
    if (!studentName || !grade || !enrolledClass || !parentName || !parentEmail || !parentPhone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(parentEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(parentPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Check if student with same parent details exists
    const existingStudent = await prisma.authorizedStudent.findFirst({
      where: {
        AND: [
          { parentEmail },
          { parentPhone }
        ]
      }
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: 'A student with these parent details already exists' },
        { status: 400 }
      );
    }

    // Create new authorized student
    const student = await prisma.authorizedStudent.create({
      data: {
        studentName,
        grade,
        enrolledClass,
        parentName,
        parentEmail,
        parentPhone
      }
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    );
  }
}

// Update authorized student
export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { 
      studentName, 
      grade, 
      enrolledClass,
      parentName,
      parentEmail,
      parentPhone
    } = body;

    // Validate all required fields
    if (!studentName || !grade || !enrolledClass || !parentName || !parentEmail || !parentPhone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if another student has the same parent details
    const existingStudent = await prisma.authorizedStudent.findFirst({
      where: {
        AND: [
          { parentEmail },
          { parentPhone },
          { NOT: { id } } // Exclude current student
        ]
      }
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: 'Another student with these parent details already exists' },
        { status: 400 }
      );
    }

    // Update student
    const student = await prisma.authorizedStudent.update({
      where: { id },
      data: {
        studentName,
        grade,
        enrolledClass,
        parentName,
        parentEmail,
        parentPhone
      }
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { error: 'Failed to update student' },
      { status: 500 }
    );
  }
}

// Delete authorized student
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    await prisma.authorizedStudent.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { error: 'Failed to delete student' },
      { status: 500 }
    );
  }
} 