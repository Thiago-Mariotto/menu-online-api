from fastapi import FastAPI
import requests

app = FastAPI()


@app.get("/")
async def get_products():
  response = requests.get("http://localhost:3001/api/products")
  return response.json()