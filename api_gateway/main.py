from fastapi import FastAPI
from src.routers import products
from src.routers import orders

app = FastAPI()


app.include_router(products.router)
app.include_router(orders.router)

@app.get("/")
async def index():
  return {"message": "Welcome to api gateway!"}