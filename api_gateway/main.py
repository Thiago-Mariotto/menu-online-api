from fastapi import FastAPI
from src.routers import products

app = FastAPI()


app.include_router(products.router)

@app.get("/")
async def index():
  return {"message": "Welcome to api gateway!"}