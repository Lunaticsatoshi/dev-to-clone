#!/bin/bash

echo "==> $(date +%H:%M:%S) ==> Migrating Django models... "
python manage.py migrate --noinput

echo "==> $(date +%H:%M:%S) ==> Collecting statics... "
rm -rf /static/*
cp -r staticfiles/ /static/

echo "==> $(date +%H:%M:%S) ==> Running uWSGI server... "
uwsgi --ini uwsgi.ini