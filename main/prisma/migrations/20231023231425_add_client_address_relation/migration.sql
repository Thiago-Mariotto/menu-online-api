/*
  Warnings:

  - You are about to drop the column `clientModelClientId` on the `ClientAddressModel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientAddressModel" DROP CONSTRAINT "ClientAddressModel_clientModelClientId_fkey";

-- AlterTable
ALTER TABLE "ClientAddressModel" DROP COLUMN "clientModelClientId";

-- AddForeignKey
ALTER TABLE "ClientModel" ADD CONSTRAINT "ClientModel_client_address_id_fkey" FOREIGN KEY ("client_address_id") REFERENCES "ClientAddressModel"("client_address_id") ON DELETE RESTRICT ON UPDATE CASCADE;
