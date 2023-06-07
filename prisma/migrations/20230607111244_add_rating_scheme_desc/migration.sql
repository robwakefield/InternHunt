-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "rating1Text" TEXT NOT NULL DEFAULT 'Just Mentioning',
ADD COLUMN     "rating2Text" TEXT NOT NULL DEFAULT 'Minimal Evidence',
ADD COLUMN     "rating3Text" TEXT NOT NULL DEFAULT 'Decent Evidence',
ADD COLUMN     "rating4Text" TEXT NOT NULL DEFAULT 'Excellent Evidence',
ADD COLUMN     "rating5Text" TEXT NOT NULL DEFAULT 'Perfect Match';
