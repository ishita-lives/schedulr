import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function createFirstAdmin() {
  try {
    // Check if any admin exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('An administrator account already exists.');
      process.exit(1);
    }

    // Get admin details
    const name = await question('Enter admin name: ');
    const email = await question('Enter admin email: ');
    const phone = await question('Enter admin phone: ');
    const password = await question('Enter admin password: ');

    // Validate input
    if (!name || !email || !phone || !password) {
      console.log('All fields are required');
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user in transaction
    await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          role: 'ADMIN',
          isVerified: true,
          status: 'ACTIVE'
        }
      });

      // Create admin profile with all permissions
      await tx.admin.create({
        data: {
          userId: user.id,
          permissionsJson: JSON.stringify([
            'MANAGE_USERS',
            'MANAGE_STUDENTS',
            'MANAGE_TEACHERS',
            'MANAGE_CLASSES',
            'MANAGE_ADMINS',
            'VIEW_REPORTS'
          ])
        }
      });
    });

    console.log('First administrator account created successfully!');
    console.log('You can now log in with your email and password.');

  } catch (error) {
    console.error('Error creating administrator:', error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

createFirstAdmin(); 