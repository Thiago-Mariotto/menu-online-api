from fastapi import APIRouter
from ..models import OrderModel
from ..message_broker.producers import msg_sender
from ..config.vars import ENV
from src.db.connection import getRedisConnection

import requests, json, redis
router = APIRouter()
host = ENV['core_host']

def getProductById(productId: str, connection: redis.Redis):
  try:
    print('BUSCANDO PRODUTO', productId)
    #devolve a qtd atual
    return connection.get(productId)
  except Exception as e:
    print('## Erro ao connection ao Redis')
    print(e)

def setProductById(productId: str, quantity: int, connection: redis.Redis):
  print('ATUALIZANDO PRODUTO', productId, quantity)
  return connection.set(productId, quantity)

def callToCache(data):
  print('CHAMANDO CACHE')
  redisConnection = getRedisConnection()
  for product in data['products']:
    productId = product['product_id']
    amount = getProductById(productId, redisConnection)
    
    # if not amount:
    #   return { 'message': f'Produto {product["product_id"]} não encontrado' }
    
    # if parsedProduct['quantity'] < product['quantity']:
    #   return { 'message': f'Quantidade insuficiente do produto {parsedProduct["name"]} no estoque' }
    print(product, 'produto')
    print(type(amount))
    updatedQuantity =  int(amount) - product['quantity']
    print('Atualizando quantidade', updatedQuantity)
    setProductById(productId, updatedQuantity, redisConnection)
    
    redisConnection.close()
    return

def callToCoreAPI(data):
  print('CHAMANDO CORE API')
  for product in data['products']:
    productId = product['product_id']
    api = f"http://{host}/api/products/{productId}"
    response = requests.get(api)
    parsedProduct = response.json()
    
    if response.status_code != 200:
      return { 'message': f'Produto {product["product_id"]} não encontrado' }
    
    if parsedProduct['quantity'] < product['quantity']:
      return { 'message': f'Quantidade insuficiente do produto {parsedProduct["name"]} no estoque' }
     
    setProductById(productId, parsedProduct['quantity'] - product['quantity'], getRedisConnection())
    print('Continuando com mensagens para fila')
    return { 'product_id': productId, 'quantity': product['quantity'] }

@router.post('/orders')
async def create_order(order: OrderModel):
  try:
    data = order.model_dump()
    callToCoreAPI(data)

  except (requests.HTTPError, requests.ConnectionError, requests.Timeout) as e:
    callToCache(data)
  
  finally:
    msg_sender.produce('newOrder', key='orders', value=json.dumps(data).encode('utf-8'))
    msg_sender.flush()
    return { 'message': 'enviando para fila' }

