import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET all classes
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let classes;
    
    // Filter classes based on user role
    switch (session.user.role) {
      case 'ADMIN':
        classes = await prisma.class.findMany({
          include: {
            teacher: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            enrollments: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            dayOfWeek: 'asc',
          },
        });
        break;

      case 'TEACHER':
        classes = await prisma.class.findMany({
          where: {
            teacher: {
              userId: session.user.id,
            },
          },
          include: {
            teacher: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            enrollments: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            dayOfWeek: 'asc',
          },
        });
        break;

      case 'PARENT':
        classes = await prisma.class.findMany({
          where: {
            enrollments: {
              some: {
                student: {
                  parentId: session.user.id,
                },
              },
            },
          },
          include: {
            teacher: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            enrollments: {
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            dayOfWeek: 'asc',
          },
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid user role' },
          { status: 403 }
        );
    }

    return NextResponse.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    );
  }
}

// POST new class
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { subject, teacherId, dayOfWeek, startTime, endTime, maxStudents } = body;

    const newClass = await prisma.class.create({
      data: {
        subject,
        teacherId,
        dayOfWeek,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        maxStudents,
      },
      include: {
        teacher: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { error: 'Failed to create class' },
      { status: 500 }
    );
  }
} 