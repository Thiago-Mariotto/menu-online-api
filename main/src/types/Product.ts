export type TProductCreated = {
  productId: string;
  name: string;
  description: string;
  price: number;
  promotionPrice: number;
  quantity: number;
  categoryId: string;
}

export type TCreationProductDTO = {
  name: string;
  description: string;
  price: number;
  promotionPrice: number;
  quantity: number;
  categoryId: string;
  storeId: string;
}