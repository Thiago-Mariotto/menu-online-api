import os

ENV = {
  'core_host': os.environ.get('CORE_HOST', 'localhost'),
  'kafka': os.environ.get('KAFKA_HOST', 'localhost:9092')
}