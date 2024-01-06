import uuid
from .connection import create_connection, close_connection, execute_query

def register_order(order):
    connection = create_connection()
    id = uuid.uuid4()
    print("registrando order")
    try:
        query = f"""
    INSERT INTO \"OrdersModel\"
    (order_id, total, payment_id, store_id)
    VALUES ('{id}', '{order['total']}', '{order['payment_method']}', 
   '{order['store_id']}')"""
        print(query)
        execute_query(connection, query)
        connection.commit()
        print("registrado com sucesso!")
    except Exception as e:
        print("error", e)
    finally:
        close_connection(connection)