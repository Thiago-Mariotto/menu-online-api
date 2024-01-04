/*
  Warnings:

  - Added the required column `store_id` to the `ProductModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductModel" ADD COLUMN     "store_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductModel" ADD CONSTRAINT "ProductModel_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "StoreModel"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;
