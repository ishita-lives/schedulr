export interface Student {
  id: string;
  name: string;
  grade: string;
  parent: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  enrolledClassesJson: string;
  createdAt: string;
  updatedAt: string;
} 