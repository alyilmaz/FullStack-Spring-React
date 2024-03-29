# Full-Stack Application 

For spring boot application:

  
  You can able to CRUD oparation except Create  on the API service.
  If you want to use swagger ui for API documentation, please click the link:
  http://localhost:8080/swagger-ui.html
  
  To run demo (Spring boot), the follows commands should be run on the terminal
  ```sh
   ./gradlew bootRun
  ```
  
  To run client-app (react), the follows commands should be run on the terminal
  ```sh
  yarn
  yarn start
  ```
  
  For unit testing:
   ```sh
  yarn test
  ```
  
  For e2e testing(cypress) after running application:
   ```sh
  yarn cypress run 
  ```
  or
  
  ```sh
  yarn cypress run open
  ```
  
## For Docker platform

to create  spring boot container:
 ```sh
   ./gradlew bootJar
   docker build -t demo-service .
   docker run -d -p 8080:8080  -t  demo-service 
  ```
  
to create react container:
 ```sh
   yarn
   yarn build
   docker build -t demo-client  .
   docker run -d -p 3000:80 -t demo-client
  ```
