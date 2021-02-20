release: python manage.py migrate && python manage.py test .
web: gunicorn FakeHub.wsgi --log-file -