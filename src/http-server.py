import http.server
import socketserver
import yaml
import os

CONFIG = "build/config.yml"

def read_config():
    with open(CONFIG,"r") as file:
        return yaml.load(file, Loader=yaml.FullLoader)

d = read_config()

PORT = d["http-listen-port"]

handler = http.server.SimpleHTTPRequestHandler

adress = "0.0.0.0"

os.chdir("src")

with socketserver.TCPServer((adress, PORT), handler) as httpd:
    print("Server started at " + adress + ":" + str(PORT))
    httpd.serve_forever()
