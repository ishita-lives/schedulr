/*
  Warnings:

  - You are about to drop the column `enrolledClass` on the `AuthorizedStudent` table. All the data in the column will be lost.
  - Added the required column `enrolledClassesJson` to the `AuthorizedStudent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AuthorizedStudent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentName" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "enrolledClassesJson" TEXT NOT NULL,
    "parentName" TEXT NOT NULL,
    "parentEmail" TEXT NOT NULL,
    "parentPhone" TEXT NOT NULL,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "registeredUserId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_AuthorizedStudent" ("createdAt", "grade", "id", "isRegistered", "parentEmail", "parentName", "parentPhone", "registeredUserId", "studentName", "updatedAt") SELECT "createdAt", "grade", "id", "isRegistered", "parentEmail", "parentName", "parentPhone", "registeredUserId", "studentName", "updatedAt" FROM "AuthorizedStudent";
DROP TABLE "AuthorizedStudent";
ALTER TABLE "new_AuthorizedStudent" RENAME TO "AuthorizedStudent";
CREATE UNIQUE INDEX "AuthorizedStudent_parentEmail_parentPhone_key" ON "AuthorizedStudent"("parentEmail", "parentPhone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
