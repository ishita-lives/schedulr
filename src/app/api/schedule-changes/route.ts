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

    let scheduleChanges;

    switch (session.user.role) {
      case 'ADMIN':
        scheduleChanges = await prisma.scheduleChange.findMany({
          include: {
            enrollment: {
              include: {
                student: {
                  include: {
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
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        break;

      case 'TEACHER':
        scheduleChanges = await prisma.scheduleChange.findMany({
          where: {
            enrollment: {
              class: {
                teacher: {
                  userId: session.user.id,
                },
              },
            },
          },
          include: {
            enrollment: {
              include: {
                student: {
                  include: {
                    parent: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
                class: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        break;

      case 'PARENT':
        scheduleChanges = await prisma.scheduleChange.findMany({
          where: {
            enrollment: {
              student: {
                parentId: session.user.id,
              },
            },
          },
          include: {
            enrollment: {
              include: {
                student: true,
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

    return NextResponse.json(scheduleChanges);
  } catch (error) {
    console.error('Error fetching schedule changes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch schedule changes' },
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
    const { enrollmentId, requestedDate, oldStartTime, oldEndTime, newStartTime, newEndTime, reason } = body;

    // Verify that the user is either an admin or the parent of the student
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        student: true,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    if (session.user.role !== 'ADMIN' && enrollment.student.parentId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const scheduleChange = await prisma.scheduleChange.create({
      data: {
        enrollmentId,
        requestedDate: new Date(requestedDate),
        oldStartTime: new Date(oldStartTime),
        oldEndTime: new Date(oldEndTime),
        newStartTime: new Date(newStartTime),
        newEndTime: new Date(newEndTime),
        reason,
        status: 'PENDING',
      },
      include: {
        enrollment: {
          include: {
            student: true,
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
        },
      },
    });

    return NextResponse.json(scheduleChange, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule change:', error);
    return NextResponse.json(
      { error: 'Failed to create schedule change' },
      { status: 500 }
    );
  }
} 