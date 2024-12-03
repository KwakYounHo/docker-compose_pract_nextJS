FROM node:22.11.0-alpine3.20 AS builder

WORKDIR /copy

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install

RUN npm run build

FROM node:22.11.0-alpine3.20 AS runtime

WORKDIR /green-art/next

COPY --from=builder /copy/.next ./.next
COPY --from=builder /copy/package.json ./

RUN npm install

CMD ["npm", "run", "start"]