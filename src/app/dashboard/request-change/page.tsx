'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Enrollment {
  id: string;
  parentStudent: {
    studentName: string;
  };
  class: {
    subject: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    teacher: {
      user: {
        name: string;
      };
    };
  };
}

export default function RequestChange() {
  const router = useRouter();
  const { data: session } = useSession();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    enrollmentId: '',
    requestedDate: '',
    newStartTime: '',
    newEndTime: '',
    reason: '',
  });

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        console.log('Fetching enrollments...');
        const response = await fetch('/api/enrollments');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch enrollments');
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (Array.isArray(data)) {
          setEnrollments(data);
        } else {
          console.error('Invalid data format:', data);
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching enrollments:', error);
        setError(error instanceof Error ? error.message : 'Failed to load enrollments. Please try again later.');
      }
    };

    if (session?.user) {
      console.log('Session user:', session.user);
      fetchEnrollments();
    } else {
      console.log('No session user found');
      setError('Please sign in to view your enrollments');
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const enrollment = enrollments.find(e => e.id === formData.enrollmentId);
      if (!enrollment) return;

      const response = await fetch('/api/schedule-changes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          oldStartTime: enrollment.class.startTime,
          oldEndTime: enrollment.class.endTime,
        }),
      });

      if (response.ok) {
        router.push('/dashboard/schedule');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to submit schedule change request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit schedule change request');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getDayName = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-red-600 hover:text-red-800 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Request Schedule Change</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label htmlFor="enrollmentId" className="block text-sm font-medium text-gray-700 mb-1">
              Select Class
            </label>
            <select
              id="enrollmentId"
              name="enrollmentId"
              required
              value={formData.enrollmentId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select a class</option>
              {enrollments.map((enrollment) => (
                <option key={enrollment.id} value={enrollment.id}>
                  {enrollment.parentStudent.studentName} - {enrollment.class.subject} ({getDayName(enrollment.class.dayOfWeek)}{' '}
                  {formatTime(enrollment.class.startTime)} - {formatTime(enrollment.class.endTime)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="requestedDate" className="block text-sm font-medium text-gray-700 mb-1">
              Requested Date
            </label>
            <input
              type="date"
              id="requestedDate"
              name="requestedDate"
              required
              value={formData.requestedDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="newStartTime" className="block text-sm font-medium text-gray-700 mb-1">
                New Start Time
              </label>
              <input
                type="time"
                id="newStartTime"
                name="newStartTime"
                required
                value={formData.newStartTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="newEndTime" className="block text-sm font-medium text-gray-700 mb-1">
                New End Time
              </label>
              <input
                type="time"
                id="newEndTime"
                name="newEndTime"
                required
                value={formData.newEndTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Change
            </label>
            <textarea
              id="reason"
              name="reason"
              required
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Please provide a reason for requesting this schedule change..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 