set -e

export IMG="waveform-viz:v1"
export CONTAINER_NAME="waveform-viz-runner"

export PORT=`cat build/config.yml | grep "http-listen-port" | awk '{print $2}'`

export DEV_ARG="${DEV_ARG:-}"
export DEV_COMPOSE=""
