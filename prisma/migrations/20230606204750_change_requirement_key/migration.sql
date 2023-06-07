/*
  Warnings:

  - The primary key for the `Evidence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reqID` on the `Evidence` table. All the data in the column will be lost.
  - You are about to drop the column `stdID` on the `Evidence` table. All the data in the column will be lost.
  - The primary key for the `Requirement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `requirementID` to the `Evidence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentID` to the `Evidence` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_postID_stdID_fkey";

-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_reqID_fkey";

-- AlterTable
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_pkey",
DROP COLUMN "reqID",
DROP COLUMN "stdID",
ADD COLUMN     "requirementID" INTEGER NOT NULL,
ADD COLUMN     "studentID" INTEGER NOT NULL,
ADD CONSTRAINT "Evidence_pkey" PRIMARY KEY ("postID", "requirementID", "studentID");

-- AlterTable
ALTER TABLE "Requirement" DROP CONSTRAINT "Requirement_pkey",
ADD CONSTRAINT "Requirement_pkey" PRIMARY KEY ("postID", "id");

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_postID_studentID_fkey" FOREIGN KEY ("postID", "studentID") REFERENCES "Application"("postID", "studentID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_postID_requirementID_fkey" FOREIGN KEY ("postID", "requirementID") REFERENCES "Requirement"("postID", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
