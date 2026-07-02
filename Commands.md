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
helm install jobflow-v2 ./charts/jobflow -n jobflow --create-namespace

kubectl get pods --namespace jobflow

kubectl describe pod jobs-f97bd75b4-6l692 --namespace jobflow

## Step by step command if something gets wrong with pods

helm uninstall jobflow -n jobflow
helm dependency update ./charts/jobflow
kubectl create namespace postgresql
helm install jobflow-v2 ./charts/jobflow -n jobflow --create-namespace
kubectl get pods --namespace jobflow

kubectl get svc -n pulsar get service, broker is what provides pulsar the envs

kubectl get svc -n jobflow

# to expose localcluster to network in local deployment

minikube service jobs -n jobflow => this will give local deployment url

# to check msg acknowledge rate .

kubectl exec -it jobflow-v2-pulsar-toolset-0 -n pulsar -- bash

# Inside the toolset container:

pulsar-admin topics stats persistent://public/default/your-topic-name

# To scale pod

kubectl scale deployment executor --replicas 5 -n jobflow

# Run this in CMD for ecr login

FOR /F "tokens=\*" %g IN ('aws ecr get-login-password --region ap-south-2') DO kubectl create secret docker-registry ecr-cred --docker-server=274414892749.dkr.ecr.ap-south-2.amazonaws.com --docker-username=AWS --docker-password=%g --namespace=jobflow

kubectl get secret ecr-cred -n jobflow

kubectl rollout restart deployment auth jobs executor products -n jobflow

kubectl exec --stdin --tty jobs-7b77956bd4-whc8m -n jobflow sh
