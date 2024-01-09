FROM python:3.11.7-bullseye

WORKDIR /app

RUN pip install confluent-kafka psycopg2 psycopg2-binary

COPY . .

CMD [ "python", "main.py" ]

