import os

ENV = {
  'kafka_host': os.getenv('KAFKA_HOST', 'localhost:9092'),
  'db_host': os.getenv('DB_HOST', 'localhost'),
}