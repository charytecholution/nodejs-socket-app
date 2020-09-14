# Nodejs-socket-app

## Running the app locally

### Building the docker image

docker build -t node-socket-app .

### Run the container 

docker run -it -p 3000:3000 node-socket-app

### Access the application from browser at http://localhost:3000

## Deploying on GKE Cluster

### 1. tag and push the docker image from local to the remote repo

docker tag node-socket-app <remote-docker-repo>
docker push <remote-docker-repo>
  
### 2. deploy the application using deployment file.

kubectl apply -f deployment.yaml --validate-skip=false

### 3. deploy the backend service for the application

kubectl apply -f backendconfig.yaml --validate-skip=false

### 4. deploy the app service for the application to make it available inside the gke cluster

kubectl apply -f app-service.yaml --validate-skip=false

### 5. deploy the ingress service to make application available to outside.

kubectl apply -f service.yaml --validate-skip=false
