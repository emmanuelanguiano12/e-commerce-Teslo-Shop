/*
  Warnings:

  - You are about to drop the column `ur` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `url` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "ur",
ADD COLUMN     "url" TEXT NOT NULL;
