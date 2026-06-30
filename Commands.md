Generator command now requires the --path argument to be passed. So the full command example should be:

nx g service --path src/app/auth
nx g module --path src/app/auth
nx g resolver --path src/app/auth

@grpc/grpc-js @grpc/proto-loader @nestjs/microservices ts-proto
All grpc related libraries

docker ps

docker exec -it <container_id> /bin/bash

## interactive shell for topics

bin/pulsar-admin topics list public/default -> this will give default topic name

public is tenant
default is namespace

bin/pulsar-admin topics stats <default-topic-name>

docker build -t jobs -f apps/jobs/Dockerfile .

// create helm chart
helm install jobflow ./charts/jobflow -n jobflow --create-namespace

kubectl get pods --namespace jobflow

kubectl describe pod jobs-f97bd75b4-6l692 --namespace jobflow

## Step by step command if something gets wrong with pods

helm uninstall jobflow -n jobflow
helm dependency update ./charts/jobflow
kubectl create namespace postgresql
helm install jobflow ./charts/jobflow -n jobflow --create-namespace
kubectl get pods --namespace jobflow

kubectl get svc -n pulsar get service, broker is what provides pulsar the envs

kubectl get svc -n jobflow

# to expose localcluster to network in local deployment

minikube service jobs -n jobflow => this will give local deployment url
