from .connection import getRedisConnection

def getProducts():
  redisConnection = getRedisConnection()
  return redisConnection.lrange('products', 0, -1)