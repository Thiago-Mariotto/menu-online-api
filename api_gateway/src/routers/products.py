from fastapi import APIRouter
import requests
from ..models import ProductModel
from ..config.vars import ENV

router = APIRouter()
host = ENV['core_host']

@router.get("/products")
async def get_products():
  api = f"http://{host}/api/products"
  print(api)
  response = requests.get(api)
  return response.json()

@router.post("/products/{store_id}")
async def create_product(product: ProductModel, store_id: str):
  api = f"http://{host}/api/products/{store_id}"
  print(api)
  data = product.model_dump()
  response = requests.post(api, json=data)
  return response.json()