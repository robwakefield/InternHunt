-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "recruiterID" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "password" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "name" SET DEFAULT '';

-- CreateTable
CREATE TABLE "Recruiter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Recruiter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_recruiterID_fkey" FOREIGN KEY ("recruiterID") REFERENCES "Recruiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
