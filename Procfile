release: python manage.py makemigrations && python manage.py migrate && python manage.py test . --keepdb
web: gunicorn FakeHub.wsgi --log-file -