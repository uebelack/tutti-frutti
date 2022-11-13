/*
  Warnings:

  - You are about to drop the column `timesSkipped` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `_GameToWord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_wordId_fkey";

-- DropForeignKey
ALTER TABLE "_GameToWord" DROP CONSTRAINT "_GameToWord_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameToWord" DROP CONSTRAINT "_GameToWord_B_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "timesSkipped",
ADD COLUMN     "skipUses" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_GameToWord";

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "index" INTEGER NOT NULL,
    "wordId" TEXT NOT NULL,
    "gameId" TEXT,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoundsWhereIncorrect" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoundsWhereIncorrect_AB_unique" ON "_RoundsWhereIncorrect"("A", "B");

-- CreateIndex
CREATE INDEX "_RoundsWhereIncorrect_B_index" ON "_RoundsWhereIncorrect"("B");

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoundsWhereIncorrect" ADD CONSTRAINT "_RoundsWhereIncorrect_A_fkey" FOREIGN KEY ("A") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoundsWhereIncorrect" ADD CONSTRAINT "_RoundsWhereIncorrect_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
