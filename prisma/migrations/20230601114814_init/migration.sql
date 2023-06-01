-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL,
    "maths" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
