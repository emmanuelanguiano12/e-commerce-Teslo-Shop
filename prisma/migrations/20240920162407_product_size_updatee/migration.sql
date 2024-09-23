/*
  Warnings:

  - You are about to drop the column `sisez` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sisez",
ADD COLUMN     "sizes" "Size"[] DEFAULT ARRAY[]::"Size"[];
