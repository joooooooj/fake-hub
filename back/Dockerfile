FROM python:3.9

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/back
COPY requirements.txt /app/back
RUN pip install -r requirements.txt

EXPOSE 5433
EXPOSE 8000

# Add docker-compose-wait tool -------------------
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && \
cd /app/back && python manage.py migrate \
&& python manage.py migrate sessions \
&& python manage.py create_superuser --username=admin --email=admin@admin.com --password=admin \
&& python manage.py test . \
&& python manage.py loaddata init_data \
&& python manage.py parse_git_file \
&& python manage.py loaddata branches \
&& python manage.py loaddata commits \
&& python manage.py runserver 0.0.0.0:8000