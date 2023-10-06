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
    "number" VARCHAR(10) NOT NULL,
    "complement" VARCHAR(100) NOT NULL,
    "user_id" TEXT NOT NULL,
    "district_id" TEXT NOT NULL,

    CONSTRAINT "AddressModel_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "UserModel" (
    "user_id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "cnpj" VARCHAR(20) NOT NULL,
    "role" VARCHAR(10) NOT NULL DEFAULT 'user',
    "phone" VARCHAR(20) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AddressModel_user_id_key" ON "AddressModel"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_cnpj_key" ON "UserModel"("cnpj");

-- AddForeignKey
ALTER TABLE "CityModel" ADD CONSTRAINT "CityModel_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "StateModel"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistrictModel" ADD CONSTRAINT "DistrictModel_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "CityModel"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressModel" ADD CONSTRAINT "AddressModel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserModel"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressModel" ADD CONSTRAINT "AddressModel_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "DistrictModel"("district_id") ON DELETE RESTRICT ON UPDATE CASCADE;
