-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "finishedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "_GameToWord" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToWord_AB_unique" ON "_GameToWord"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToWord_B_index" ON "_GameToWord"("B");

-- AddForeignKey
ALTER TABLE "_GameToWord" ADD CONSTRAINT "_GameToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToWord" ADD CONSTRAINT "_GameToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
