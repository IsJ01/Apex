FROM openjdk:23-jdk

WORKDIR /app/

COPY ./.env .
COPY ./target/api-0.0.1-SNAPSHOT.jar .
RUN mkdir files

CMD java -jar api-0.0.1-SNAPSHOT.jar