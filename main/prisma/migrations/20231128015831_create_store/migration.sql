-- CreateTable
CREATE TABLE "StoreModel" (
    "store_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "user_id" TEXT NOT NULL,
    "cnpj" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "store_address_id" TEXT NOT NULL,

    CONSTRAINT "StoreModel_pkey" PRIMARY KEY ("store_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoreModel_cnpj_key" ON "StoreModel"("cnpj");

-- AddForeignKey
ALTER TABLE "StoreModel" ADD CONSTRAINT "StoreModel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserModel"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreModel" ADD CONSTRAINT "StoreModel_store_address_id_fkey" FOREIGN KEY ("store_address_id") REFERENCES "StoreAddressModel"("store_address_id") ON DELETE RESTRICT ON UPDATE CASCADE;
