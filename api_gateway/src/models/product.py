from pydantic import BaseModel
from typing import Optional

class ProductModel(BaseModel):
  name:  str
  description: Optional[str]
  price: float
  quantity: int
  promotionPrice: float
  categoryId: str
