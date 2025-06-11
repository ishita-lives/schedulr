import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getTimeLabel(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

async function getClassesWithDetails(userId: string, isAdmin: boolean) {
  return await prisma.class.findMany({
    where: isAdmin ? {} : {
      enrollments: {
        some: {
          parentStudent: {
            parentId: userId
          }
        }
      }
    },
    include: {
      teacher: {
        include: {
          user: true,
        },
      },
      enrollments: {
        where: isAdmin ? {} : {
          parentStudent: {
            parentId: userId
          }
        },
        include: {
          parentStudent: {
            include: {
              parent: true
            }
          },
        },
      },
    },
  });
}

export default async function SchedulePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }

  const classes = await getClassesWithDetails(session.user.id, session.user.isAdmin);

  // Find all unique time slots
  const timeSlotsSet = new Set<string>();
  classes.forEach(cls => {
    timeSlotsSet.add(cls.startTime.toISOString());
    timeSlotsSet.add(cls.endTime.toISOString());
  });
  const timeSlots = Array.from(timeSlotsSet)
    .map(t => new Date(t))
    .sort((a, b) => a.getTime() - b.getTime());

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        {session.user.isAdmin ? "All Classes Schedule" : "Your Children's Class Schedule"}
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-50">Time</th>
              {DAYS.map(day => (
                <th key={day} className="border px-2 py-1 bg-gray-50">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, i) => (
              <tr key={slot.toISOString()}>
                <td className="border px-2 py-1 font-mono text-xs w-24">{getTimeLabel(slot)}</td>
                {DAYS.map((day, dayIdx) => {
                  // Find class for this day/time
                  const classForSlot = classes.find(
                    cls =>
                      cls.dayOfWeek === dayIdx &&
                      new Date(cls.startTime).getTime() === slot.getTime()
                  );
                  return (
                    <td key={day} className="border px-2 py-1 align-top">
                      {classForSlot ? (
                        <div className="bg-primary/10 rounded p-2 mb-1">
                          <div className="font-semibold">{classForSlot.subject}</div>
                          <div className="text-xs text-gray-600 mb-1">Teacher: {classForSlot.teacher.user.name}</div>
                          <div className="text-xs text-gray-700">
                            {session.user.isAdmin ? (
                              <>
                                Enrolled Students:
                                <ul className="list-disc ml-4">
                                  {classForSlot.enrollments.map((enr) => (
                                    <li key={enr.id}>
                                      {enr.parentStudent.studentName} 
                                      <span className="text-gray-400">({enr.parentStudent.grade})</span>
                                      <span className="text-gray-500 text-xs ml-2">
                                        - Parent: {enr.parentStudent.parent.name}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : (
                              <>
                                Your Children:
                                <ul className="list-disc ml-4">
                                  {classForSlot.enrollments.map((enr) => (
                                    <li key={enr.id}>
                                      {enr.parentStudent.studentName} 
                                      <span className="text-gray-400">({enr.parentStudent.grade})</span>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 