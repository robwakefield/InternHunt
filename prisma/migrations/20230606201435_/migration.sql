-- CreateTable
CREATE TABLE "Requirement" (
    "postID" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
