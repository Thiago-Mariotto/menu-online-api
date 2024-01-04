from fastapi import APIRouter
import requests
from ..models import ProductModel

router = APIRouter()

@router.get("/products")
async def get_products():
  response = requests.get("http://localhost:3001/api/products")
  return response.json()

@router.post("/products/{store_id}")
async def create_product(product: ProductModel, store_id: str):
  data = product.model_dump()
  response = requests.post(f"http://localhost:3001/api/products/{store_id}", json=data)
  return response.json()