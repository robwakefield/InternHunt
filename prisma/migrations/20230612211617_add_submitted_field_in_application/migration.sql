-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "submitted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Evidence" ALTER COLUMN "evidenceText" DROP NOT NULL;
