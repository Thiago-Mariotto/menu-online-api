-- CreateTable
CREATE TABLE "OrdersModel" (
    "order_id" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_id" TEXT NOT NULL,
    "orderStatus" VARCHAR(15) NOT NULL DEFAULT 'pending',
    "store_id" TEXT NOT NULL,

    CONSTRAINT "OrdersModel_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "OrderProductModel" (
    "order_item_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "product_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "OrderProductModel_pkey" PRIMARY KEY ("order_item_id")
);

-- AddForeignKey
ALTER TABLE "OrdersModel" ADD CONSTRAINT "OrdersModel_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "PaymentModel"("payment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersModel" ADD CONSTRAINT "OrdersModel_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "StoreModel"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProductModel" ADD CONSTRAINT "OrderProductModel_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductModel"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProductModel" ADD CONSTRAINT "OrderProductModel_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "OrdersModel"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
