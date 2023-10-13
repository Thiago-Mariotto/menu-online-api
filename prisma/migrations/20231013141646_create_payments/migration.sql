-- CreateTable
CREATE TABLE "PaymentModel" (
    "payment_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "PaymentModel_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentModel_name_key" ON "PaymentModel"("name");
