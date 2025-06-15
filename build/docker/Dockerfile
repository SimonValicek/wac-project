FROM node:latest AS build

RUN mkdir /build
WORKDIR /build

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM ghcr.io/polyfea/spa-base

COPY --from=build /build/www /spa/public

ENV OTEL_SERVICE_NAME=xvaliceks-wac-project
ENV SPA_BASE_PORT=8080
EXPOSE 8080
