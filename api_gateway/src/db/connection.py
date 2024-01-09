import redis

def getRedisConnection():
  try:
    redisConnection = redis.Redis(host='redis', port=6379, decode_responses=True)
    print('Redis conectado')
    return redisConnection
  except Exception as e:
    print(e)
    print('## Erro ao connection ao Redis')