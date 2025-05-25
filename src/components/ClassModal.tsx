'use client';

import { useState, useEffect } from 'react';

interface ClassStudent {
  id: string;
  name: string;
  grade: string;
}

interface Class {
  id: string;
  name: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  students: ClassStudent[];
}

interface ClassModalProps {
  classItem: Class | null;
  onClose: () => void;
  onSave: (classData: any) => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function ClassModal({ classItem, onClose, onSave }: ClassModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    dayOfWeek: 'Monday',
    startTime: '09:00',
    endTime: '10:00'
  });

  useEffect(() => {
    if (classItem) {
      setFormData({
        name: classItem.name,
        dayOfWeek: classItem.dayOfWeek,
        startTime: classItem.startTime,
        endTime: classItem.endTime
      });
    }
  }, [classItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate times
    const start = new Date(`1970-01-01T${formData.startTime}`);
    const end = new Date(`1970-01-01T${formData.endTime}`);
    
    if (end <= start) {
      alert('End time must be after start time');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">
          {classItem ? 'Edit Class' : 'Add New Class'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Day of Week
            </label>
            <select
              value={formData.dayOfWeek}
              onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {DAYS_OF_WEEK.map(day => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {classItem && classItem.students.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enrolled Students
              </label>
              <div className="bg-gray-50 p-3 rounded-md">
                {classItem.students.map(student => (
                  <div key={student.id} className="text-sm text-gray-600">
                    {student.name} - Grade {student.grade}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 