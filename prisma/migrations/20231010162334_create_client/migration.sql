-- CreateTable
CREATE TABLE "ClientModel" (
    "client_id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,

    CONSTRAINT "ClientModel_pkey" PRIMARY KEY ("client_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientModel_email_key" ON "ClientModel"("email");
