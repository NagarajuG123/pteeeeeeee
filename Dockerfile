FROM node:14-alpine3.13

WORKDIR /app

COPY ./package.json .

#COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run build:1851:qa

RUN chown node:node -R /app/dist

EXPOSE 4400

USER node

CMD npm run serve:ssr