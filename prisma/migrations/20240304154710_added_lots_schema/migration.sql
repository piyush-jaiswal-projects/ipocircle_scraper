-- CreateTable
CREATE TABLE "Lots_Data" (
    "id" SERIAL NOT NULL,
    "ipoLotsId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "lots_min" INTEGER NOT NULL,
    "lots_max" INTEGER NOT NULL,
    "min_retail_lots" INTEGER NOT NULL,
    "max_retail_lots" INTEGER NOT NULL,
    "min_shni_lots" INTEGER NOT NULL,
    "max_shni_lots" INTEGER NOT NULL,
    "min_bhni_lots" INTEGER NOT NULL,
    "max_bhni_lots" INTEGER NOT NULL,
    "min_retail_shares" INTEGER NOT NULL,
    "max_retail_shares" INTEGER NOT NULL,
    "min_shni_shares" INTEGER NOT NULL,
    "max_shni_shares" INTEGER NOT NULL,
    "min_bhni_shares" INTEGER NOT NULL,
    "max_bhni_shares" INTEGER NOT NULL,
    "min_retail_price" INTEGER NOT NULL,
    "max_retail_price" INTEGER NOT NULL,
    "min_shni_price" INTEGER NOT NULL,
    "max_shni_price" INTEGER NOT NULL,
    "min_bhni_price" INTEGER NOT NULL,
    "max_bhni_price" INTEGER NOT NULL,

    CONSTRAINT "Lots_Data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lots_Data_id_key" ON "Lots_Data"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lots_Data_ipoLotsId_key" ON "Lots_Data"("ipoLotsId");

-- AddForeignKey
ALTER TABLE "Lots_Data" ADD CONSTRAINT "Lots_Data_ipoLotsId_fkey" FOREIGN KEY ("ipoLotsId") REFERENCES "Ipo_Lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
