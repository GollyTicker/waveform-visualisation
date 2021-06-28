source source.sh

echo "Stopping runner"
docker-compose -f build/docker-compose.yml down
echo "Stopped runner"
