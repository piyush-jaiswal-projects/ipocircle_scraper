/*
  Warnings:

  - You are about to drop the column `ipoLotsId` on the `Lots_Data` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lots_Data" DROP CONSTRAINT "Lots_Data_ipoLotsId_fkey";

-- DropIndex
DROP INDEX "Lots_Data_ipoLotsId_key";

-- AlterTable
ALTER TABLE "Lots_Data" DROP COLUMN "ipoLotsId",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Lots_Data_id_seq";

-- AddForeignKey
ALTER TABLE "Lots_Data" ADD CONSTRAINT "Lots_Data_id_fkey" FOREIGN KEY ("id") REFERENCES "Ipo_Lots"("ipo_id") ON DELETE RESTRICT ON UPDATE CASCADE;
