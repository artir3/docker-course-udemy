docker build -t artir3/docker-course-client:latest \
    -t artir3/docker-course-client:$SHA \
    -f ./client/Dockerfile ./client
docker build -t artir3/docker-course-server:latest \
    -t artir3/docker-course-server:$SHA \
    -f ./server/Dockerfile ./server
docker build -t artir3/docker-course-worker:latest \
    -t artir3/docker-course-worker:$SHA \
    -f ./worker/Dockerfile ./worker

docker push artir3/docker-course-client:latest
docker push artir3/docker-course-client:$SHA
docker push artir3/docker-course-server:latest
docker push artir3/docker-course-server:$SHA
docker push artir3/docker-course-worker:latest
docker push artir3/docker-course-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment server=artir3/docker-course-client:$SHA
kubectl set image deployments/server-deployment server=artir3/docker-course-server:$SHA
kubectl set image deployments/worker-deployment server=artir3/docker-course-worker:$SHA