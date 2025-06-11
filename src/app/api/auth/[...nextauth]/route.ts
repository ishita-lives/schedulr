import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            adminProfile: true,
            teacherProfile: true
          }
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

        if (!user.isVerified) {
          throw new Error('Please verify your email first');
        }

        if (user.status !== 'ACTIVE') {
          throw new Error('Your account is not active. Please contact support.');
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isAdmin: !!user.adminProfile,
          isTeacher: !!user.teacherProfile,
          isParent: user.role === 'PARENT'
        };
      },
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isAdmin = user.isAdmin;
        token.isTeacher = user.isTeacher;
        token.isParent = user.isParent;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isAdmin = token.isAdmin;
        session.user.isTeacher = token.isTeacher;
        session.user.isParent = token.isParent;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions }; 