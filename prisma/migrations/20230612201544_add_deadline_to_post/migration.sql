/*
  Warnings:

  - You are about to drop the column `language` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `maths` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "language",
DROP COLUMN "maths";
