-- CreateEnum
CREATE TYPE "Crops" AS ENUM ('SOYBEANS', 'CORN', 'COTTON', 'COFFEE', 'SUGARCANE');

-- CreateTable
CREATE TABLE "rural_producers" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farm_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_hectares_farm" DOUBLE PRECISION NOT NULL,
    "arable_hectares" DOUBLE PRECISION NOT NULL,
    "vegetation_hectared" DOUBLE PRECISION NOT NULL,
    "plantedCrops" "Crops"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "rural_producers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rural_producers_document_key" ON "rural_producers"("document");
