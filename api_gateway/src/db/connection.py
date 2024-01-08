import redis

def getRedisConnection():
  try:
    redisConnection = redis.Redis(host='redis', port=6379, decode_responses=True)
    redisConnection.set('a014dcb7-a36d-4376-97d2-f319fe14690e', '100')
    print('populando')
    print('Redis conectado')
    return redisConnection
  except Exception as e:
    print(e)
    print('## Erro ao connection ao Redis')