-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_playerId_fkey";

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
