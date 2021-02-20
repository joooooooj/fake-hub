release: python manage.py makemigrations && python manage.py migrate
web: gunicorn FakeHub.wsgi --log-file -