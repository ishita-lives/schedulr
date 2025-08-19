import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function convertAuthorizedParents() {
  try {
    // Get all authorized parents that haven't been registered yet
    const authorizedParents = await prisma.authorizedParent.findMany({
      where: {
        isRegistered: false
      }
    });

    console.log(`Found ${authorizedParents.length} authorized parents to convert`);

    for (const authParent of authorizedParents) {
      try {
        // Generate a temporary password
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 12);

        // Create parent user
        const parentUser = await prisma.user.create({
          data: {
            name: authParent.name,
            email: authParent.email,
            phone: authParent.phone,
            password: hashedPassword,
            role: 'PARENT',
            isVerified: true,
            status: 'ACTIVE'
          }
        });

        // Parse students from JSON
        const students = JSON.parse(authParent.studentsJson);

        // Create ParentStudent records
        for (const student of students) {
          await prisma.parentStudent.create({
            data: {
              parentId: parentUser.id,
              studentName: student.name,
              grade: student.grade
            }
          });
        }

        // Update AuthorizedParent to mark as registered
        await prisma.authorizedParent.update({
          where: { id: authParent.id },
          data: {
            isRegistered: true,
            registeredUserId: parentUser.id
          }
        });

        console.log(`Created parent account for ${authParent.name} with ${students.length} students`);
        console.log(`Temporary password: ${tempPassword}`);

      } catch (error) {
        console.error(`Error processing authorized parent ${authParent.name}:`, error);
      }
    }

  } catch (error) {
    console.error('Error in conversion process:', error);
  } finally {
    await prisma.$disconnect();
  }
}

convertAuthorizedParents(); 