FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]