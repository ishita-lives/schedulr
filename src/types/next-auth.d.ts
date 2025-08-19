import 'next-auth';

declare module 'next-auth' {
  interface User {
    role: 'ADMIN' | 'TEACHER' | 'PARENT';
    isAdmin: boolean;
    isTeacher: boolean;
    isParent: boolean;
  }

  interface Session {
    user: User & {
      id: string;
      role: 'ADMIN' | 'TEACHER' | 'PARENT';
      isAdmin: boolean;
      isTeacher: boolean;
      isParent: boolean;
    };
  }
} 