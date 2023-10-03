FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV NODE_ENV = test
ENV PORT = 5000
ENV MONGO_URI = test
ENV JWT_SECRET = test
ENV PAYPAl_CLIENT_ID = test
ENV ACCESS_KEY = test
ENV AWS_SECRET = test

EXPOSE 5000

CMD [ "npm", "start" ]