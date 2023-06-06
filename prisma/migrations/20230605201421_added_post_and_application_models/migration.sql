-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'studentName',
ALTER COLUMN "language" SET DEFAULT 'none',
ALTER COLUMN "maths" SET DEFAULT 'none';

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "postID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
