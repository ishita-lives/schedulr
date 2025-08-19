import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const aiAgents = [
  {
    id: 'schedule-assistant',
    name: 'Schedule Assistant',
    description: 'Helps manage and optimize class schedules, handle conflicts, and suggest optimal time slots.',
    capabilities: [
      'Schedule optimization',
      'Conflict resolution',
      'Resource allocation',
      'Time slot suggestions'
    ],
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'student-analyzer',
    name: 'Student Performance Analyzer',
    description: 'Analyzes student performance data to provide insights and recommendations for improvement.',
    capabilities: [
      'Performance tracking',
      'Progress analysis',
      'Learning pattern identification',
      'Personalized recommendations'
    ],
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: 'communication-bot',
    name: 'Communication Bot',
    description: 'Handles routine communications with parents, students, and teachers.',
    capabilities: [
      'Automated notifications',
      'Response generation',
      'Communication scheduling',
      'Message prioritization'
    ],
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    id: 'resource-planner',
    name: 'Resource Planner',
    description: 'Optimizes resource allocation for classes, teachers, and facilities.',
    capabilities: [
      'Resource optimization',
      'Capacity planning',
      'Utilization analysis',
      'Cost optimization'
    ],
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default async function AIAgentsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">AI Agents</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {aiAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {agent.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{agent.name}</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">{agent.description}</p>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Capabilities:</h4>
                <ul className="mt-2 space-y-1">
                  {agent.capabilities.map((capability) => (
                    <li key={capability} className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Activate Agent
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 