import { NextResponse } from 'next/server';
import { PrismaClient, UserRole } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_PERMISSIONS = [
  'MANAGE_USERS',
  'MANAGE_STUDENTS',
  'MANAGE_TEACHERS',
  'MANAGE_CLASSES',
  'MANAGE_ADMINS',
  'VIEW_REPORTS'
] as const;

type AdminPermission = typeof ADMIN_PERMISSIONS[number];

// Get all administrators
export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin and has permission
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminUser = await prisma.admin.findUnique({
      where: { userId: session.user.id },
      include: { user: true }
    });

    if (!adminUser?.permissions.includes('MANAGE_ADMINS')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const administrators = await prisma.admin.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(administrators);
  } catch (error) {
    console.error('Error fetching administrators:', error);
    return NextResponse.json(
      { error: 'Failed to fetch administrators' },
      { status: 500 }
    );
  }
}

// Create new administrator
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin and has permission
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminUser = await prisma.admin.findUnique({
      where: { userId: session.user.id }
    });

    if (!adminUser?.permissions.includes('MANAGE_ADMINS')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { name, email, phone, password, permissions } = body;

    // Validate required fields
    if (!name || !email || !phone || !password || !permissions) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate permissions
    if (!Array.isArray(permissions) || !permissions.every(p => ADMIN_PERMISSIONS.includes(p))) {
      return NextResponse.json(
        { error: 'Invalid permissions specified' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email or phone already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user in transaction
    const admin = await prisma.$transaction(async (prisma) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          role: 'ADMIN' as UserRole,
          isVerified: true,
        }
      });

      // Create admin profile
      const admin = await prisma.admin.create({
        data: {
          userId: user.id,
          permissions,
          createdBy: session.user.id
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              createdAt: true
            }
          }
        }
      });

      return admin;
    });

    return NextResponse.json(admin, { status: 201 });
  } catch (error) {
    console.error('Error creating administrator:', error);
    return NextResponse.json(
      { error: 'Failed to create administrator' },
      { status: 500 }
    );
  }
}

// Update administrator permissions
export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin and has permission
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminUser = await prisma.admin.findUnique({
      where: { userId: session.user.id }
    });

    if (!adminUser?.permissions.includes('MANAGE_ADMINS')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Administrator ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { permissions } = body;

    // Validate permissions
    if (!Array.isArray(permissions) || !permissions.every(p => ADMIN_PERMISSIONS.includes(p))) {
      return NextResponse.json(
        { error: 'Invalid permissions specified' },
        { status: 400 }
      );
    }

    // Prevent self-modification of permissions
    if (id === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot modify your own permissions' },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.update({
      where: { userId: id },
      data: { permissions },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true
          }
        }
      }
    });

    return NextResponse.json(admin);
  } catch (error) {
    console.error('Error updating administrator:', error);
    return NextResponse.json(
      { error: 'Failed to update administrator' },
      { status: 500 }
    );
  }
}

// Delete administrator
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    
    // Check if user is admin and has permission
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminUser = await prisma.admin.findUnique({
      where: { userId: session.user.id }
    });

    if (!adminUser?.permissions.includes('MANAGE_ADMINS')) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Administrator ID is required' },
        { status: 400 }
      );
    }

    // Prevent self-deletion
    if (id === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // Delete admin in transaction
    await prisma.$transaction(async (prisma) => {
      // Delete admin profile first
      await prisma.admin.delete({
        where: { userId: id }
      });

      // Then delete user
      await prisma.user.delete({
        where: { id }
      });
    });

    return NextResponse.json({ message: 'Administrator deleted successfully' });
  } catch (error) {
    console.error('Error deleting administrator:', error);
    return NextResponse.json(
      { error: 'Failed to delete administrator' },
      { status: 500 }
    );
  }
} 