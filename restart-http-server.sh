source source.sh

./stop-http-service.sh || true

# call with --dev to run locally

if [[ "$1" == "--dev" ]]; then
  DEV_ARG="$1"
  DEV_COMPOSE="-f build/docker-compose-dev.yml"
fi

docker build -f build/Dockerfile -t $IMG .

docker-compose -f build/docker-compose.yml $DEV_COMPOSE up --build --detach
