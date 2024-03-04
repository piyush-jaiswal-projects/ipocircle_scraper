/*
  Warnings:

  - You are about to drop the `Gmp_Values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lots_Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reserve_Data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gmp_Values" DROP CONSTRAINT "Gmp_Values_gmp_id_fkey";

-- DropForeignKey
ALTER TABLE "Lots_Data" DROP CONSTRAINT "Lots_Data_id_fkey";

-- DropForeignKey
ALTER TABLE "Reserve_Data" DROP CONSTRAINT "Reserve_Data_ipoReservations_id_fkey";

-- AlterTable
ALTER TABLE "Ipo_Gmp" ADD COLUMN     "absolute_value" DECIMAL(65,30)[],
ADD COLUMN     "instant" TIMESTAMP(3)[],
ADD COLUMN     "percent_value" DECIMAL(65,30)[];

-- AlterTable
ALTER TABLE "Ipo_Lots" ADD COLUMN     "category" TEXT[],
ADD COLUMN     "lots_max" INTEGER[],
ADD COLUMN     "lots_min" INTEGER[],
ADD COLUMN     "max_bhni_lots" INTEGER[],
ADD COLUMN     "max_bhni_price" INTEGER[],
ADD COLUMN     "max_bhni_shares" INTEGER[],
ADD COLUMN     "max_retail_lots" INTEGER[],
ADD COLUMN     "max_retail_price" INTEGER[],
ADD COLUMN     "max_retail_shares" INTEGER[],
ADD COLUMN     "max_shni_lots" INTEGER[],
ADD COLUMN     "max_shni_price" INTEGER[],
ADD COLUMN     "max_shni_shares" INTEGER[],
ADD COLUMN     "min_bhni_lots" INTEGER[],
ADD COLUMN     "min_bhni_price" INTEGER[],
ADD COLUMN     "min_bhni_shares" INTEGER[],
ADD COLUMN     "min_retail_lots" INTEGER[],
ADD COLUMN     "min_retail_price" INTEGER[],
ADD COLUMN     "min_retail_shares" INTEGER[],
ADD COLUMN     "min_shni_lots" INTEGER[],
ADD COLUMN     "min_shni_price" INTEGER[],
ADD COLUMN     "min_shni_shares" INTEGER[];

-- AlterTable
ALTER TABLE "Ipo_Reservations" ADD COLUMN     "category" TEXT[],
ADD COLUMN     "shares_offerred" INTEGER[];

-- DropTable
DROP TABLE "Gmp_Values";

-- DropTable
DROP TABLE "Lots_Data";

-- DropTable
DROP TABLE "Reserve_Data";
