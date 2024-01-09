FROM python:3.11.7-bullseye

RUN apt-get update && apt-get install -y make

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 3333

CMD [ "make", "run" ]