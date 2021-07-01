import yaml
from flask import Flask, request, send_from_directory

CONFIG = "build/config.yml"

def read_config():
    with open(CONFIG,"r") as file:
        return yaml.load(file, Loader=yaml.FullLoader)

d = read_config()

PORT = d["http-listen-port"]

app = Flask(__name__)

@app.route("/", defaults={"filename": "index.html"})
@app.route("/<path:filename>")
def serve_static_files(filename):
    return send_from_directory(".", filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
