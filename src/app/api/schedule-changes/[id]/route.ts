import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['ADMIN', 'TEACHER'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { status } = body;

    // Verify that the schedule change exists and the teacher is authorized
    const scheduleChange = await prisma.scheduleChange.findUnique({
      where: { id },
      include: {
        enrollment: {
          include: {
            class: {
              include: {
                teacher: true,
              },
            },
          },
        },
      },
    });

    if (!scheduleChange) {
      return NextResponse.json(
        { error: 'Schedule change not found' },
        { status: 404 }
      );
    }

    // If user is a teacher, verify they are the teacher of the class
    if (
      session.user.role === 'TEACHER' &&
      scheduleChange.enrollment.class.teacher.userId !== session.user.id
    ) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Update the schedule change status
    const updatedScheduleChange = await prisma.scheduleChange.update({
      where: { id },
      data: { status },
      include: {
        enrollment: {
          include: {
            student: {
              include: {
                parent: {
                  select: {
                    name: true,
                    email: true,
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
    });

    // TODO: Send email notification to parent about the status change

    return NextResponse.json(updatedScheduleChange);
  } catch (error) {
    console.error('Error updating schedule change:', error);
    return NextResponse.json(
      { error: 'Failed to update schedule change' },
      { status: 500 }
    );
  }
} 