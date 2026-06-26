Generator command now requires the --path argument to be passed. So the full command example should be:

nx g service --path src/app/auth
nx g module --path src/app/auth
nx g resolver --path src/app/auth

@grpc/grpc-js @grpc/proto-loader @nestjs/microservices ts-proto
All grpc related libraries
