'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ParentModal } from '@/components/ParentModal';

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  students: {
    id: string;
    name: string;
    grade: string;
  }[];
}

export default function AdminParents() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session?.user?.isAdmin) {
      router.push('/auth/signin');
      return;
    }

    fetchParents();
  }, [session, status, router]);

  const fetchParents = async () => {
    try {
      const response = await fetch('/api/admin/parents');
      if (!response.ok) throw new Error('Failed to fetch parents');
      const data = await response.json();
      setParents(data);
    } catch (err) {
      setError('Failed to load parents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveParent = async (parentData: any) => {
    try {
      const url = selectedParent
        ? `/api/admin/parents?id=${selectedParent.id}`
        : '/api/admin/parents';
      
      const response = await fetch(url, {
        method: selectedParent ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parentData),
      });

      if (!response.ok) {
        throw new Error('Failed to save parent');
      }

      // Refresh the parents list
      await fetchParents();
      setShowModal(false);
      setSelectedParent(null);
    } catch (err) {
      console.error('Error saving parent:', err);
      setError('Failed to save parent');
    }
  };

  const handleDeleteParent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this parent? This will also delete all associated students.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/parents?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete parent');
      }

      // Refresh the parents list
      await fetchParents();
    } catch (err) {
      console.error('Error deleting parent:', err);
      setError('Failed to delete parent');
    }
  };

  if (status === 'loading' || loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Parent Management</h1>
        <button
          onClick={() => {
            setSelectedParent(null);
            setShowModal(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Add New Parent
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parents.map((parent) => (
              <tr key={parent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{parent.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{parent.email}</div>
                  <div className="text-sm text-gray-500">{parent.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {parent.students.map(student => (
                      <div key={student.id}>
                        {student.name} - Grade {student.grade}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedParent(parent);
                      setShowModal(true);
                    }}
                    className="text-primary hover:text-primary-dark mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteParent(parent.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ParentModal
          parent={selectedParent}
          onClose={() => {
            setShowModal(false);
            setSelectedParent(null);
          }}
          onSave={handleSaveParent}
        />
      )}
    </div>
  );
} 