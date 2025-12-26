import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """API для учёта и получения количества посетителей сайта"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }

    dsn = os.environ.get('DATABASE_URL')
    
    try:
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()

        if method == 'POST':
            cur.execute("""
                UPDATE visitor_stats 
                SET total_visitors = total_visitors + 1, 
                    updated_at = CURRENT_TIMESTAMP 
                WHERE id = 1
                RETURNING total_visitors
            """)
            total = cur.fetchone()[0]
            conn.commit()
        else:
            cur.execute("SELECT total_visitors FROM visitor_stats WHERE id = 1")
            result = cur.fetchone()
            total = result[0] if result else 0

        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'total_visitors': total}),
            'isBase64Encoded': False
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
