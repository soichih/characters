docker network create character

docker rm -f mongo
docker run --restart=always \
    --network character \
    --name mongo \
    -d mongo

docker rm -f character
docker run --restart=always \
    --network character \
    --name character \
    -p 3000:3000 \
    -v `pwd`:/app \
    -d node:10 /app/run.sh

docker logs -f character
