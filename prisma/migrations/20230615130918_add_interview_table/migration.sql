-- CreateTable
CREATE TABLE "Interview" (
    "postID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,
    "location" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("postID","studentID")
);

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_postID_studentID_fkey" FOREIGN KEY ("postID", "studentID") REFERENCES "Application"("postID", "studentID") ON DELETE RESTRICT ON UPDATE CASCADE;
