/*
  Warnings:

  - You are about to drop the column `shares_offerres` on the `Reserve_Data` table. All the data in the column will be lost.
  - Added the required column `shares_offerred` to the `Reserve_Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserve_Data" DROP COLUMN "shares_offerres",
ADD COLUMN     "shares_offerred" INTEGER NOT NULL;
