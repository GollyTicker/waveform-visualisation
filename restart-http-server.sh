./stop-http-service.sh || true

PORT=`cat build/config.yml | grep "http-listen-port" | awk '{print $2}'`

docker build -f build/Dockerfile -t waveform-viz:v1 .

CMD="docker run --rm \
--name waveform-viz-runner \
-p ${PORT}:${PORT} waveform-viz:v1"

echo "$CMD"

(nohup $CMD 2>&1 &) > /dev/null
