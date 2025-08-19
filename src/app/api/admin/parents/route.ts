import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/parents - Get all parents
export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parents = await prisma.parent.findMany({
      include: {
        students: {
          select: {
            id: true,
            name: true,
            grade: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
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

// POST /api/admin/parents - Create a new parent
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!phone.match(/^\+?[\d\s-]{8,}$/)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Check if parent with same email exists
    const existingParent = await prisma.parent.findUnique({
      where: { email }
    });

    if (existingParent) {
      return NextResponse.json(
        { error: 'A parent with this email already exists' },
        { status: 400 }
      );
    }

    const parent = await prisma.parent.create({
      data: {
        name,
        email,
        phone
      },
      include: {
        students: {
          select: {
            id: true,
            name: true,
            grade: true
          }
        }
      }
    });

    return NextResponse.json(parent, { status: 201 });
  } catch (error) {
    console.error('Error creating parent:', error);
    return NextResponse.json(
      { error: 'Failed to create parent' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/parents - Update a parent
export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.isAdmin) {
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

    const body = await request.json();
    const { name, email, phone } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!phone.match(/^\+?[\d\s-]{8,}$/)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Check if another parent has the same email
    const existingParent = await prisma.parent.findFirst({
      where: {
        AND: [
          { email },
          { NOT: { id } }
        ]
      }
    });

    if (existingParent) {
      return NextResponse.json(
        { error: 'Another parent with this email already exists' },
        { status: 400 }
      );
    }

    const parent = await prisma.parent.update({
      where: { id },
      data: {
        name,
        email,
        phone
      },
      include: {
        students: {
          select: {
            id: true,
            name: true,
            grade: true
          }
        }
      }
    });

    return NextResponse.json(parent);
  } catch (error) {
    console.error('Error updating parent:', error);
    return NextResponse.json(
      { error: 'Failed to update parent' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/parents - Delete a parent
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.isAdmin) {
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

    // Delete all associated students first
    await prisma.student.deleteMany({
      where: { parentId: id }
    });

    // Then delete the parent
    await prisma.parent.delete({
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