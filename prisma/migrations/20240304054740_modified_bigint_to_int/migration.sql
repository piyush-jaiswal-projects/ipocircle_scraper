/*
  Warnings:

  - You are about to alter the column `anchor_shares_offerred` on the `Ipo_Anchor` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `shares_offerres` on the `Ipo_Reservations` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `anchor_shares_offerred` on the `Ipo_Shares` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `qib_shares_offerred` on the `Ipo_Shares` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `nii_bnii_shares_offerred` on the `Ipo_Shares` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `nii_snii_shares_offerred` on the `Ipo_Shares` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `retail_shares_offerred` on the `Ipo_Shares` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `shares_bid` on the `Ipo_Subscriptions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Ipo_Anchor" ALTER COLUMN "anchor_shares_offerred" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Ipo_Reservations" ALTER COLUMN "shares_offerres" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Ipo_Shares" ALTER COLUMN "anchor_shares_offerred" SET DATA TYPE INTEGER,
ALTER COLUMN "qib_shares_offerred" SET DATA TYPE INTEGER,
ALTER COLUMN "nii_bnii_shares_offerred" SET DATA TYPE INTEGER,
ALTER COLUMN "nii_snii_shares_offerred" SET DATA TYPE INTEGER,
ALTER COLUMN "retail_shares_offerred" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Ipo_Subscriptions" ALTER COLUMN "shares_bid" SET DATA TYPE INTEGER;
