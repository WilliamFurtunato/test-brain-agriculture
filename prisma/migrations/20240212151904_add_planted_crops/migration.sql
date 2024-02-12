/*
  Warnings:

  - You are about to drop the column `plantedCrops` on the `rural_producers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rural_producers" DROP COLUMN "plantedCrops";

-- CreateTable
CREATE TABLE "planted_crops" (
    "id" TEXT NOT NULL,
    "name" "Crops" NOT NULL,
    "ruralProducerId" TEXT NOT NULL,

    CONSTRAINT "planted_crops_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "planted_crops" ADD CONSTRAINT "planted_crops_ruralProducerId_fkey" FOREIGN KEY ("ruralProducerId") REFERENCES "rural_producers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
