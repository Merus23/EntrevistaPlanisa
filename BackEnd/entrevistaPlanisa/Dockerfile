FROM openjdk:17-jdk-slim

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN ./mvnw dependency:go-offline -B

RUN ./mvnw package -DskipTests

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]
