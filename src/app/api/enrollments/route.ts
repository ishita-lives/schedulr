import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let enrollments;

    switch (session.user.role) {
      case 'ADMIN':
        enrollments = await prisma.enrollment.findMany({
          include: {
            student: {
              select: {
                name: true,
                parent: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            class: {
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
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        break;

      case 'TEACHER':
        enrollments = await prisma.enrollment.findMany({
          where: {
            class: {
              teacher: {
                userId: session.user.id,
              },
            },
          },
          include: {
            student: {
              select: {
                name: true,
                parent: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            class: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        break;

      case 'PARENT':
        enrollments = await prisma.enrollment.findMany({
          where: {
            student: {
              parentId: session.user.id,
            },
          },
          include: {
            student: {
              select: {
                name: true,
              },
            },
            class: {
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
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid user role' },
          { status: 403 }
        );
    }

    return NextResponse.json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { studentId, classId } = body;

    // Verify that the user is either an admin or the parent of the student
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    if (session.user.role !== 'ADMIN' && student.parentId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Check if the class has available spots
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        enrollments: true,
      },
    });

    if (!classData) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      );
    }

    if (classData.enrollments.length >= classData.maxStudents) {
      return NextResponse.json(
        { error: 'Class is full' },
        { status: 400 }
      );
    }

    // Create the enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        classId,
      },
      include: {
        student: {
          select: {
            name: true,
          },
        },
        class: {
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
        },
      },
    });

    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    );
  }
} 