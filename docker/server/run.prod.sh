#!/bin/bash

echo "==> $(date +%H:%M:%S) ==> Migrating Django models... "
python manage.py migrate --noinput

echo "==> $(date +%H:%M:%S) ==> Running server... "
python manage.py runserver 0.0.0.0:8000