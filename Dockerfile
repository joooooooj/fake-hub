FROM node

WORKDIR /app/front
COPY package.json /app/front

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]

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
&& python manage.py runserver 0.0.0.0:8000