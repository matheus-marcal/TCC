FROM node:16

WORKDIR /srv/app
COPY . .
RUN npm install
RUN npm run build
CMD ["node", "dist/index.js"]