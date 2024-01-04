-- CreateTable
CREATE TABLE "ClientAddressModel" (
    "client_address_id" TEXT NOT NULL,
    "complement" VARCHAR(100) NOT NULL,
    "number" VARCHAR(4) NOT NULL,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "ClientAddressModel_pkey" PRIMARY KEY ("client_address_id")
);

-- AddForeignKey
ALTER TABLE "ClientAddressModel" ADD CONSTRAINT "ClientAddressModel_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "AddressModel"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;
