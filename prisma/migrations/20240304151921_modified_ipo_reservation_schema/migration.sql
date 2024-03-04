/*
  Warnings:

  - You are about to drop the column `category` on the `Ipo_Reservations` table. All the data in the column will be lost.
  - You are about to drop the column `shares_offerres` on the `Ipo_Reservations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ipo_Reservations" DROP COLUMN "category",
DROP COLUMN "shares_offerres";

-- CreateTable
CREATE TABLE "Reserve_Data" (
    "id" SERIAL NOT NULL,
    "ipoReservations_id" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "shares_offerres" INTEGER NOT NULL,

    CONSTRAINT "Reserve_Data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reserve_Data_id_key" ON "Reserve_Data"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reserve_Data_ipoReservations_id_key" ON "Reserve_Data"("ipoReservations_id");

-- AddForeignKey
ALTER TABLE "Reserve_Data" ADD CONSTRAINT "Reserve_Data_ipoReservations_id_fkey" FOREIGN KEY ("ipoReservations_id") REFERENCES "Ipo_Reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
