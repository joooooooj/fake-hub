release: python manage.py migrate && python loaddata fixtures.json && python manage.py parse_git_file && python manage.py loaddata branches python manage.py loaddata commits
web: gunicorn FakeHub.wsgi --log-file -