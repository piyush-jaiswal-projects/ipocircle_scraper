/*
  Warnings:

  - The values [MAIN,SME] on the enum `IPO_Series` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "IPO_Series_new" AS ENUM ('main', 'sme');
ALTER TABLE "Ipo" ALTER COLUMN "series" TYPE "IPO_Series_new" USING ("series"::text::"IPO_Series_new");
ALTER TYPE "IPO_Series" RENAME TO "IPO_Series_old";
ALTER TYPE "IPO_Series_new" RENAME TO "IPO_Series";
DROP TYPE "IPO_Series_old";
COMMIT;

-- AlterTable
ALTER TABLE "Ipo_Subscriptions" ALTER COLUMN "shares_bid" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "qib" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "nii_snii" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "nii_bnii" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "retail" SET DATA TYPE DECIMAL(65,30);
