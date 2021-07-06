FROM python:3.9-slim-buster

WORKDIR /app

COPY build/requirements.txt build/

RUN pip3 install -r build/requirements.txt

COPY build/config.yml build/
COPY src src
