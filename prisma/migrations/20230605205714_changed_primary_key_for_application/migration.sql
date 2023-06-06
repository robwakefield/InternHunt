/*
  Warnings:

  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("postID", "studentID");

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "language" DROP DEFAULT,
ALTER COLUMN "maths" DROP DEFAULT,
ALTER COLUMN "name" DROP DEFAULT;
