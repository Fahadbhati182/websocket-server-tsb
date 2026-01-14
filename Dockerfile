FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 8080

CMD ["node", "src/server.js"]



# docker build -t websocket-server .
# docker run -p 8080:8080 websocket-server

