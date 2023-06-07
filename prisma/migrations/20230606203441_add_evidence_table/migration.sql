-- CreateTable
CREATE TABLE "Evidence" (
    "postID" INTEGER NOT NULL,
    "stdID" INTEGER NOT NULL,
    "reqID" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "evidenceText" TEXT NOT NULL,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("postID","reqID","stdID")
);

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_postID_stdID_fkey" FOREIGN KEY ("postID", "stdID") REFERENCES "Application"("postID", "studentID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_reqID_fkey" FOREIGN KEY ("reqID") REFERENCES "Requirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
