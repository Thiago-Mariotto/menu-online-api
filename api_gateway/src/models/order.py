from pydantic import BaseModel
from typing import Optional
from .product import ProductFromSale

class OrderModel(BaseModel):
  total: float
  products: list[ProductFromSale]
  coupon_id: Optional[str]
  store_id: str
  payment_method: str

