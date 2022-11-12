-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "wordId" TEXT;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE SET NULL ON UPDATE CASCADE;
