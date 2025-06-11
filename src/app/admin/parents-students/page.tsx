import { prisma } from '@/lib/prisma';
import React from 'react';

async function getParentsWithStudents() {
  return await prisma.user.findMany({
    where: { role: 'PARENT' },
    include: {
      parentStudents: true,
    },
    orderBy: { name: 'asc' },
  });
}

export default async function ParentsStudentsPage() {
  const parents = await getParentsWithStudents();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Parents & Students</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parents.map((parent: any) => (
              <tr key={parent.id}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{parent.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{parent.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{parent.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul className="list-disc ml-4">
                    {parent.parentStudents.length === 0 ? (
                      <li className="text-gray-400 italic">No students</li>
                    ) : (
                      parent.parentStudents.map((student: any) => (
                        <li key={student.id}>
                          {student.studentName} <span className="text-xs text-gray-500">({student.grade})</span>
                        </li>
                      ))
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 