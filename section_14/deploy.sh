docker build -t artir3/docker-course-client:latest -f ./client/Dockerfile ./client
docker build -t artir3/docker-course-server:latest -f ./server/Dockerfile ./server
docker build -t artir3/docker-course-worker:latest -f ./worker/Dockerfile ./worker
docker push artir3/docker-course-client
docker push artir3/docker-course-server
docker push artir3/docker-course-worker
kubectl apply -f k8s
kubectl set image deployments/server-deployment server=artir3/docker-course-server