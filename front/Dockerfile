FROM node:12.18.0

WORKDIR /app/front
COPY package.json /app/front

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]