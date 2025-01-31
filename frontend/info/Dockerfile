FROM node
LABEL authors="IsJ01"

WORKDIR /code

COPY .. /code/

EXPOSE 3000

RUN npm install react
RUN npm install react-router-dom
RUN npm install axios
RUN npm install react-jsx-parser

CMD npm start