/*
  Warnings:

  - Added the required column `requirementText` to the `Requirement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requirement" ADD COLUMN     "requirementText" TEXT NOT NULL;
