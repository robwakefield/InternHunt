-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rejected" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Evidence" ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0;
