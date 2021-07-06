from render import render_deploy_path_into_html
from shared import read_config, dev_mode
from flask import Flask, request, send_from_directory

conf = read_config()

render_deploy_path_into_html(conf)

app = Flask(__name__)

@app.route("/", defaults={"filename": "index.html"})
@app.route("/<path:filename>")
def serve_static_files(filename):
    return send_from_directory(".", filename)

if __name__ == "__main__":
    print("dev_mode: ", dev_mode())
    app.run(host="0.0.0.0", port=conf["http-listen-port"], debug=dev_mode())
