-- CreateTable
CREATE TABLE "Stage" (
    "postID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "stageText" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("postID","studentID","id")
);

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_postID_studentID_fkey" FOREIGN KEY ("postID", "studentID") REFERENCES "Application"("postID", "studentID") ON DELETE RESTRICT ON UPDATE CASCADE;
