from fastapi import FastAPI
from src.routers import products
from src.routers import orders
import redis

app = FastAPI()

app.include_router(products.router)
app.include_router(orders.router)

@app.get("/")
async def index():
  return {"message": "Welcome to api gateway!"}


try:
  print('start')
  redisConnection = redis.Redis(host='redis', port=6379, decode_responses=True)
  redisConnection.set('a014dcb7-a36d-4376-97d2-f319fe14690e', '50')
  print('populando')
except:
  print('## Erro ao connection ao Redis')
finally:
  redisConnection.close()