-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "gameId" TEXT;

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "fiftyFiftyUses" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "score" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
