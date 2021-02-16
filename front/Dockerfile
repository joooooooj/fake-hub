FROM node

WORKDIR /app/front
COPY package.json /app/front
RUN sed -i "s,PROXY,http://172.25.0.3:8000,g" package.json
RUN cat package.json

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]