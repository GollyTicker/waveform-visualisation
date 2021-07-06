import yaml
import sys

CONFIG = "build/config.yml"

def read_config():
    with open(CONFIG,"r") as file:
        return yaml.load(file, Loader=yaml.FullLoader)

def dev_mode():
    return len(sys.argv) >= 2 and sys.argv[1] == "--dev"
