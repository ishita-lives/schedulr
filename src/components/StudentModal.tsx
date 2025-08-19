import { useState, useEffect } from 'react';
import { Student } from '@/types/student';

interface StudentModalProps {
  student: Student | null;
  onClose: () => void;
  onSave: (studentData: any) => void;
}

const AVAILABLE_CLASSES = ['ENGLISH', 'MATHEMATICS', 'THINKING_SKILLS'];

export function StudentModal({ student, onClose, onSave }: StudentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    parentId: '',
    enrolledClasses: [] as string[]
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        grade: student.grade,
        parentId: student.parent.id,
        enrolledClasses: JSON.parse(student.enrolledClassesJson)
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleClassToggle = (className: string) => {
    setFormData(prev => ({
      ...prev,
      enrolledClasses: prev.enrolledClasses.includes(className)
        ? prev.enrolledClasses.filter(c => c !== className)
        : [...prev.enrolledClasses, className]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">
          {student ? 'Edit Student' : 'Add New Student'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
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
              Grade
            </label>
            <input
              type="text"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enrolled Classes
            </label>
            <div className="space-y-2">
              {AVAILABLE_CLASSES.map((className) => (
                <label key={className} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.enrolledClasses.includes(className)}
                    onChange={() => handleClassToggle(className)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>{className.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

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