/*
  Warnings:

  - Added the required column `client_address_id` to the `ClientModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClientAddressModel" ADD COLUMN     "clientModelClientId" TEXT;

-- AlterTable
ALTER TABLE "ClientModel" ADD COLUMN     "client_address_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ClientAddressModel" ADD CONSTRAINT "ClientAddressModel_clientModelClientId_fkey" FOREIGN KEY ("clientModelClientId") REFERENCES "ClientModel"("client_id") ON DELETE SET NULL ON UPDATE CASCADE;
