FROM node:18
WORKDIR /app
COPY package*.json /app/
RUN npm install
ENV PORT=3333
ENV NODE_ENV=production
COPY . /app/
EXPOSE 3333
CMD ["npm", "start"]