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
