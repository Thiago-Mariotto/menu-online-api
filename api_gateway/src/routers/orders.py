from fastapi import APIRouter
from ..models import OrderModel
from ..message_broker.producers import msg_sender
from ..config.vars import ENV
import requests, json, redis

router = APIRouter()
host = ENV['core_host']

@router.post('/orders')
async def create_order(order: OrderModel):
  data = order.model_dump()

  for product in data['products']:
    productId = product['product_id']
    api = f"http://{host}/api/products/{productId}"

  try:
    response = requests.get(api)
    response.raise_for_status()
    print(response.json())
  
  except requests.HTTPError as e:
    print('HTTP Error: buscando dados no cache')
    r = redis.Redis(host='redis', port=6379, decode_responses=True)
    print('BUSCANDO DADOS DO REDIS', r)
    return { 'message': 'Erro ao conectar com a API' }
  
  except requests.ConnectionError as e:
    print('Connection Error: buscando dados no cache ')
    r = redis.Redis(host='redis', port=6379, decode_responses=True)
    return { 'message': 'A API está fora do ar ou ocorreu um erro de rede' }
  
  except requests.Timeout as e:
    print('Timeout: buscando dados no cache')
    r = redis.Redis(host='redis', port=6379, decode_responses=True)
    return { 'message': 'Timeout ao conectar com a API' }

    if not findedProduct:
      return { 'message': f'Produto {product["product_id"]} não encontrado' }
    
    parsedProduct = findedProduct.json()
    if parsedProduct['quantity'] < product['quantity']:
      return { 'message': f'Quantidade insuficiente do produto {parsedProduct["name"]} no estoque' }

  msg_sender.produce('orders', key='newOrder', value=json.dumps(data).encode('utf-8'))
  msg_sender.flush()
  
  # valida estoque na api CORE (implementar cache se api off)
  # product = getProductRespose.json()
  # if product['quantity'] < data['quantity']:
  #   return {'message': 'Quantidade insuficiente no estoque'}
  
  # envia para fila pedido com estoque
  # response = requests.post('ENVIAR PARA ENDPOINT DA FILA')
  return { 'message': 'enviando para fila'}