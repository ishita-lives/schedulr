import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

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

    const userRole = session.user.role;
    let stats = {};

    switch (userRole) {
      case 'ADMIN':
        // Get all stats
        const [totalClasses, totalStudents, pendingRequests] = await Promise.all([
          prisma.class.count(),
          prisma.student.count(),
          prisma.scheduleChange.count({
            where: {
              status: 'PENDING'
            }
          })
        ]);

        stats = {
          totalClasses,
          totalStudents,
          pendingRequests
        };
        break;

      case 'TEACHER':
        // Get teacher-specific stats
        const teacherProfile = await prisma.teacher.findUnique({
          where: { userId: session.user.id },
        });

        if (teacherProfile) {
          const [teacherClasses, teacherStudents, teacherRequests] = await Promise.all([
            prisma.class.count({
              where: { teacherId: teacherProfile.id }
            }),
            prisma.enrollment.count({
              where: {
                class: {
                  teacherId: teacherProfile.id
                }
              }
            }),
            prisma.scheduleChange.count({
              where: {
                enrollment: {
                  class: {
                    teacherId: teacherProfile.id
                  }
                },
                status: 'PENDING'
              }
            })
          ]);

          stats = {
            totalClasses: teacherClasses,
            totalStudents: teacherStudents,
            pendingRequests: teacherRequests
          };
        }
        break;

      case 'PARENT':
        // Get parent-specific stats
        const [enrolledClasses, upcomingClasses, parentRequests] = await Promise.all([
          prisma.enrollment.count({
            where: {
              student: {
                parentId: session.user.id
              }
            }
          }),
          prisma.class.count({
            where: {
              enrollments: {
                some: {
                  student: {
                    parentId: session.user.id
                  }
                }
              },
              startTime: {
                gte: new Date()
              }
            }
          }),
          prisma.scheduleChange.count({
            where: {
              enrollment: {
                student: {
                  parentId: session.user.id
                }
              },
              status: 'PENDING'
            }
          })
        ]);

        stats = {
          totalClasses: enrolledClasses,
          upcomingClasses,
          pendingRequests: parentRequests
        };
        break;
    }

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
} 