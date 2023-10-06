-- CreateTable
CREATE TABLE "StateModel" (
    "state_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,

    CONSTRAINT "StateModel_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "CityModel" (
    "city_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "state_id" TEXT NOT NULL,

    CONSTRAINT "CityModel_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "StoreAddressModel" (
    "store_address_id" TEXT NOT NULL,
    "complement" VARCHAR(100) NOT NULL,
    "number" VARCHAR(4) NOT NULL,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "StoreAddressModel_pkey" PRIMARY KEY ("store_address_id")
);

-- CreateTable
CREATE TABLE "DistrictModel" (
    "district_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "city_id" TEXT NOT NULL,

    CONSTRAINT "DistrictModel_pkey" PRIMARY KEY ("district_id")
);

-- CreateTable
CREATE TABLE "AddressModel" (
    "address_id" TEXT NOT NULL,
    "cep" VARCHAR(10) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "district_id" TEXT NOT NULL,

    CONSTRAINT "AddressModel_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "UserModel" (
    "user_id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(20) NOT NULL,
    "role" VARCHAR(10) NOT NULL DEFAULT 'user',
    "phone" VARCHAR(20) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "CategoryModel" (
    "category_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "CategoryModel_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "ProductModel" (
    "product_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "promotionPrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "ProductModel_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "ProductImageModel" (
    "id" SERIAL NOT NULL,
    "path" VARCHAR(100) NOT NULL,
    "filename" VARCHAR(100) NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "ProductImageModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_cpf_key" ON "UserModel"("cpf");

-- AddForeignKey
ALTER TABLE "CityModel" ADD CONSTRAINT "CityModel_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "StateModel"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreAddressModel" ADD CONSTRAINT "StoreAddressModel_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "AddressModel"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistrictModel" ADD CONSTRAINT "DistrictModel_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "CityModel"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressModel" ADD CONSTRAINT "AddressModel_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "DistrictModel"("district_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductModel" ADD CONSTRAINT "ProductModel_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "CategoryModel"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImageModel" ADD CONSTRAINT "ProductImageModel_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductModel"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
