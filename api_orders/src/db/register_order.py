from .connection import create_connection, close_connection, execute_query

def register_order(order):
    connection = create_connection()
    print("registrando order")
    try:
        query = f"""
    INSERT INTO orders 
    (total, payment_id, store_id)
    VALUES ('{order['total']}', '{order['payment_id']}', 
   '{order['store_id']}'"""
        execute_query(connection, query)
        connection.commit()
    except Exception as e:
        print(e)
    finally:
        close_connection(connection)