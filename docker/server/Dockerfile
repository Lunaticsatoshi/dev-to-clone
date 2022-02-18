FROM python:3.9.7

ENV PYTHONUNBUFFERED=1

WORKDIR /app/
COPY ./server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./server ./
COPY ./docker/server ./docker/server

RUN python manage.py collectstatic --noinput