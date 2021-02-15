FROM python:3.9

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/back
COPY requirements.txt /app/back
RUN pip install -r requirements.txt

CMD ["python", "manage.py", "create_superuser", "--username=admin", "--email=admin@admin.com" "--password=admin"]
CMD ["python", "manage.py", "migrate", "0.0.0.0:8000"]

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]