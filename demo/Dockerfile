FROM openjdk:11-jdk
VOLUME /tmp
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} demo-service.jar
RUN mkdir /classpath
ENTRYPOINT ["java","-jar","/demo-service.jar"]