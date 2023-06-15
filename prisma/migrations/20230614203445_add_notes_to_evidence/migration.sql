/*
  Warnings:

  - Made the column `evidenceText` on table `Evidence` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Evidence" ADD COLUMN     "notes" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "evidenceText" SET NOT NULL,
ALTER COLUMN "evidenceText" SET DEFAULT '';
