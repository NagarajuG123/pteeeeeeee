FROM node:14-alpine3.13

WORKDIR /app

VOLUME /app/dist/1851/browser

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install

COPY . .

RUN cp src/publications/ee/index.html src/

RUN cp src/publications/ee/variables.scss src/assets/scss/

RUN npm run build:ee:qa

RUN chown node:node -R /app/dist

EXPOSE 4500

USER node

CMD npm run serve:ssr