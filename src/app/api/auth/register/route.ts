import { NextResponse } from 'next/server';
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Function to validate password strength
function isPasswordStrong(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, role } = body;

    // Basic validation
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email or phone number already exists' },
        { status: 400 }
      );
    }

    // For parents, check if they are authorized
    if (role === 'PARENT') {
      const authorizedStudent = await prisma.authorizedStudent.findFirst({
        where: {
          AND: [
            { parentEmail: email },
            { parentPhone: phone },
            { isRegistered: false }
          ]
        }
      });

      if (!authorizedStudent) {
        return NextResponse.json(
          { 
            error: 'We could not verify your details. Please ensure you are enrolled in our tutoring center or contact administration.' 
          },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user and update records in a transaction
    const user = await prisma.$transaction(async (prisma) => {
      // Create the user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          role: role as UserRole,
          isVerified: role === 'TEACHER' ? false : true, // Teachers need manual verification
        },
      });

      if (role === 'PARENT') {
        // Find all authorized students for this parent
        const authorizedStudents = await prisma.authorizedStudent.findMany({
          where: {
            AND: [
              { parentEmail: email },
              { parentPhone: phone },
              { isRegistered: false }
            ]
          }
        });

        // Create student profiles and mark authorized students as registered
        for (const authStudent of authorizedStudents) {
          // Create student profile
          await prisma.student.create({
            data: {
              name: authStudent.studentName,
              grade: authStudent.grade,
              parentId: newUser.id,
            }
          });

          // Mark authorized student as registered
          await prisma.authorizedStudent.update({
            where: { id: authStudent.id },
            data: {
              isRegistered: true,
              registeredUserId: newUser.id
            }
          });
        }
      }

      // If teacher, create pending profile
      if (role === 'TEACHER') {
        await prisma.teacher.create({
          data: {
            userId: newUser.id,
            subjects: [],
            verificationStatus: 'PENDING'
          }
        });
      }

      return newUser;
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: role === 'TEACHER' 
          ? 'Registration successful. Your account is pending verification by administration.'
          : 'Registration successful! You can now sign in.',
        user: userWithoutPassword 
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration. Please try again.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 