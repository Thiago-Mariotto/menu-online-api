import psycopg2

def create_connection():
    return psycopg2.connect(
        host="localhost",
        database="menu_online",
        user="postgres",
        password="password",
        port="5432",
        )

def close_connection(connection):
    connection.close()
    
def execute_query(connection, query):
    cur = connection.cursor()
    cur.execute("SET search_path TO database")
    cur.execute(query)