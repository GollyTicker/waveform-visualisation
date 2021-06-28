./stop-http-service.sh || true

source source.sh

docker build -f build/Dockerfile -t $IMG .

docker-compose -f build/docker-compose.yml up --build --detach
