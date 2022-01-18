FROM node:alpine
WORKDIR /app
COPY . ./
RUN yarn global add serve
RUN yarn
RUN yarn build
# COPY build/ /app/build
EXPOSE 3000
CMD serve -s build/