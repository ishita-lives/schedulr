import { PrismaClient } from '@prisma/client';
// using prisma and postreSQL

const prisma = new PrismaClient();

// Valid class options
type ValidClass = 'ENGLISH' | 'MATHEMATICS' | 'THINKING_SKILLS';

interface AuthorizedStudentData {
  studentName: string;
  grade: string;
  enrolledClasses: ValidClass[];
  parentName: string;
  parentEmail: string;
  parentPhone: string;
}

const authorizedStudents: AuthorizedStudentData[] = [
  {
    studentName: "John Smith",
    grade: "Year 5",
    enrolledClasses: ["MATHEMATICS", "THINKING_SKILLS"],
    parentName: "Sarah Smith",
    parentEmail: "sarah.smith@example.com",
    parentPhone: "0412345678"
  },
  {
    studentName: "Emily Chen",
    grade: "Year 4",
    enrolledClasses: ["ENGLISH", "MATHEMATICS", "THINKING_SKILLS"],
    parentName: "David Chen",
    parentEmail: "david.chen@example.com",
    parentPhone: "0423456789"
  },
  {
    studentName: "Michael Wang",
    grade: "Year 6",
    enrolledClasses: ["ENGLISH", "THINKING_SKILLS"],
    parentName: "Lisa Wang",
    parentEmail: "lisa.wang@example.com",
    parentPhone: "0434567890"
  },
  {
    studentName: "Sophie Brown",
    grade: "Year 3",
    enrolledClasses: ["MATHEMATICS"],
    parentName: "James Brown",
    parentEmail: "james.brown@example.com",
    parentPhone: "0445678901"
  }
];

async function seedAuthorizedStudents() {
  try {
    console.log('Starting to seed authorized students...');
    console.log(`Found ${authorizedStudents.length} students to process...`);

    for (const student of authorizedStudents) {
      try {
        console.log(`\nProcessing student: ${student.studentName}`);
        
        const existingStudent = await prisma.authorizedParent.findFirst({
          where: {
            email: student.parentEmail,
            phone: student.parentPhone,
            studentsJson: JSON.stringify([{ name: student.studentName, grade: student.grade }])
          }
        });

        if (!existingStudent) {
          console.log(`Creating new student record for ${student.studentName}...`);
          const { enrolledClasses } = student;
          const created = await prisma.authorizedParent.create({
            data: {
              name: student.parentName,
              email: student.parentEmail,
              phone: student.parentPhone,
              studentsJson: JSON.stringify([{ name: student.studentName, grade: student.grade }]),
              enrolledClassesJson: JSON.stringify(enrolledClasses)
            }
          });
          console.log(`Successfully created student: ${student.studentName} (Classes: ${student.enrolledClasses.join(', ')})`);
          console.log('Created record:', created);
        } else {
          console.log(`Student ${student.studentName} already exists with ID: ${existingStudent.id}`);
        }
      } catch (studentError) {
        console.error(`Error processing student ${student.studentName}:`, studentError);
      }
    }

    // Double check final count
    const finalCount = await prisma.authorizedParent.count();
    console.log(`\nFinal authorized student count in database: ${finalCount}`);

  } catch (error) {
    console.error('Error in seed function:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAuthorizedStudents(); 