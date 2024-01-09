import psycopg2
from ..config.vars import ENV

def create_connection():
    return psycopg2.connect(
        host=ENV['db_host'],
        database="menu_online",
        user="postgres",
        password="password"
        )

def close_connection(connection):
    connection.close()
    
def execute_query(connection, query):
    cur = connection.cursor()
    cur.execute("SET search_path TO database")
    cur.execute(query)