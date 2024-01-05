from fastapi import APIRouter
from ..models import OrderModel
from ..message_broker.producers import msg_sender
import requests
import json

router = APIRouter()

@router.post('/orders/{store_id}')
async def create_order(order: OrderModel, store_id: str):
  data = order.model_dump()

  for product in data['products']:
    productId = product['product_id']
    findedProduct = requests.get(f"http://localhost:3001/api/products/{productId}")
    if not findedProduct:
      return { 'message': f'Produto {product["product_id"]} não encontrado' }
    
    parsedProduct = findedProduct.json()
    if parsedProduct['quantity'] < product['quantity']:
      return { 'message': f'Quantidade insuficiente do produto {parsedProduct["name"]} no estoque' }

  msg_sender.produce('orders', key='newOrder', value=json.dumps(data).encode('utf-8'))
  
  # valida estoque na api CORE (implementar cache se api off)
  # product = getProductRespose.json()
  # if product['quantity'] < data['quantity']:
  #   return {'message': 'Quantidade insuficiente no estoque'}
  
  # envia para fila pedido com estoque
  # response = requests.post('ENVIAR PARA ENDPOINT DA FILA')
  return { 'message': 'enviando para fila'}