'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  totalClasses?: number;
  totalStudents?: number;
  pendingRequests?: number;
  upcomingClasses?: number;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  subject: string;
  tutor: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({});
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    subject: '',
    tutor: '',
  });

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderStats = () => {
    const statsConfig = {
      admin: [
        { label: 'Total Classes', value: stats.totalClasses || 0, color: 'bg-blue-500' },
        { label: 'Total Students', value: stats.totalStudents || 0, color: 'bg-green-500' },
        { label: 'Pending Requests', value: stats.pendingRequests || 0, color: 'bg-yellow-500' },
      ],
      teacher: [
        { label: 'My Classes', value: stats.totalClasses || 0, color: 'bg-blue-500' },
        { label: 'My Students', value: stats.totalStudents || 0, color: 'bg-green-500' },
        { label: 'Schedule Changes', value: stats.pendingRequests || 0, color: 'bg-yellow-500' },
      ],
      parent: [
        { label: 'Enrolled Classes', value: stats.totalClasses || 0, color: 'bg-blue-500' },
        { label: 'Upcoming Classes', value: stats.upcomingClasses || 0, color: 'bg-green-500' },
        { label: 'Pending Requests', value: stats.pendingRequests || 0, color: 'bg-yellow-500' },
      ],
    };

    const userRole = (session?.user?.role?.toLowerCase() || 'parent') as keyof typeof statsConfig;
    const currentStats = statsConfig[userRole];

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentStats.map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden bg-white rounded-lg shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 ${stat.color} rounded-md`}>
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 w-0 ml-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.label}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {loading ? (
                          <div className="w-12 h-8 bg-gray-200 animate-pulse rounded"></div>
                        ) : (
                          stat.value
                        )}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderWelcomeMessage = () => {
    const messages = {
      admin: 'Welcome back, Administrator',
      teacher: 'Welcome back, Teacher',
      parent: 'Welcome to your Parent Dashboard',
    };

    const userRole = (session?.user?.role?.toLowerCase() || 'parent') as keyof typeof messages;
    return messages[userRole];
  };

  const handleScheduleAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the appointment
    const appointment: Appointment = {
      id: Math.random().toString(),
      ...newAppointment,
    };
    setAppointments([...appointments, appointment]);
    setNewAppointment({
      date: '',
      time: '',
      subject: '',
      tutor: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {/* Schedule New Appointment */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule New Appointment</h2>
          <form onSubmit={handleScheduleAppointment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={newAppointment.subject}
                  onChange={(e) => setNewAppointment({ ...newAppointment, subject: e.target.value })}
                >
                  <option value="">Select a subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tutor</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  value={newAppointment.tutor}
                  onChange={(e) => setNewAppointment({ ...newAppointment, tutor: e.target.value })}
                >
                  <option value="">Select a tutor</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Schedule Appointment
            </button>
          </form>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {appointments.length === 0 ? (
              <p className="p-6 text-gray-500">No upcoming appointments</p>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.subject}</p>
                      <p className="text-sm text-gray-500">with {appointment.tutor}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.date} at {appointment.time}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {session?.user?.role === 'ADMIN' && (
              <>
                <QuickActionCard
                  title="Add New Class"
                  description="Create a new class schedule"
                  href="/dashboard/classes/new"
                />
                <QuickActionCard
                  title="Manage Teachers"
                  description="View and manage teacher profiles"
                  href="/dashboard/teachers"
                />
                <QuickActionCard
                  title="View Schedule Changes"
                  description="Review pending schedule change requests"
                  href="/dashboard/schedule-changes"
                />
              </>
            )}

            {session?.user?.role === 'TEACHER' && (
              <>
                <QuickActionCard
                  title="View Today's Classes"
                  description="Check your schedule for today"
                  href="/dashboard/my-classes"
                />
                <QuickActionCard
                  title="Schedule Changes"
                  description="Review schedule change requests"
                  href="/dashboard/schedule-requests"
                />
              </>
            )}

            {session?.user?.role === 'PARENT' && (
              <>
                <QuickActionCard
                  title="View Schedule"
                  description="Check your children's class schedule"
                  href="/dashboard/schedule"
                />
                <QuickActionCard
                  title="Request Change"
                  description="Submit a schedule change request"
                  href="/dashboard/request-change"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
    >
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </Link>
  );
} 