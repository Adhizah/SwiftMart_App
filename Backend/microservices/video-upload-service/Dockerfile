FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8094

ENTRYPOINT ["java", "-jar", "app.jar"] 