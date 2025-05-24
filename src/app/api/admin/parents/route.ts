import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

// Get all authorized parents with their students
export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parents = await prisma.authorizedParent.findMany({
      include: {
        students: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(parents);
  } catch (error) {
    console.error('Error fetching parents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parents' },
      { status: 500 }
    );
  }
}

// Add new authorized parent with their students
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { parentName, parentEmail, parentPhone, students } = body;

    // Validate required parent fields
    if (!parentName || !parentEmail || !parentPhone) {
      return NextResponse.json(
        { error: 'Parent name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate students array
    if (!students || !Array.isArray(students) || students.length === 0) {
      return NextResponse.json(
        { error: 'At least one student is required' },
        { status: 400 }
      );
    }

    // Check if parent already exists
    const existingParent = await prisma.authorizedParent.findFirst({
      where: {
        OR: [
          { email: parentEmail },
          { phone: parentPhone }
        ]
      }
    });

    if (existingParent) {
      return NextResponse.json(
        { error: 'Parent with this email or phone already exists' },
        { status: 400 }
      );
    }

    // Create parent and students in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create parent
      const parent = await prisma.authorizedParent.create({
        data: {
          name: parentName,
          email: parentEmail,
          phone: parentPhone,
        }
      });

      // Create students
      const studentPromises = students.map(student => 
        prisma.authorizedStudent.create({
          data: {
            studentName: student.name,
            grade: student.grade,
            enrolledClass: student.enrolledClass,
            parentId: parent.id
          }
        })
      );

      const createdStudents = await Promise.all(studentPromises);

      return {
        parent,
        students: createdStudents
      };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating parent:', error);
    return NextResponse.json(
      { error: 'Failed to create parent and students' },
      { status: 500 }
    );
  }
}

// Delete authorized parent and their students
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
        { error: 'Parent ID is required' },
        { status: 400 }
      );
    }

    // Delete parent (this will cascade delete their students due to the relation)
    await prisma.authorizedParent.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Parent and associated students deleted successfully' });
  } catch (error) {
    console.error('Error deleting parent:', error);
    return NextResponse.json(
      { error: 'Failed to delete parent' },
      { status: 500 }
    );
  }
} 