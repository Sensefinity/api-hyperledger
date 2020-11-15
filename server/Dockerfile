FROM node:lts-buster

ENV USER DEV

ENV SERVICE_NAME=api-hyperledger \
    SERVICE_DESC='API Interface for Hyperledger system' \
    SERVICE_TAGS='local,local-test,sens8,sensefinity-blockchain,api-hyperledger,hyperledger-api' \
    SERVICE_CHECK_ENDPOINT="/" \
    SERVICE_CHECK_INTERVAL=10s \
    SERVICE_CHECK_TIMEOUT=2s \
    SERVICE_REST_AUTH_TYPE=Basic \
    SERVICE_REST_ALLOW_CORS_ORIGIN=http://localhost:8090 \
    NODE_ENV=dev \
    PORT=8091

WORKDIR /usr/app

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 8091

CMD ["npm", "start"]
