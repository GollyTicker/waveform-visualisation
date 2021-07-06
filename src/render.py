from shared import read_config, dev_mode

conf = read_config()

def render_deploy_path_into_html(conf):
    deploy_path = conf["dev-path"] if dev_mode() else conf["prod-path"]

    with open(conf["html-file"],"r") as file:
        contents = file.read()

    rendered = contents.replace(conf["path-placeholder"], deploy_path)

    with open(conf["html-file"],"w") as file:
        file.write(rendered)

    print("Rendered HTML to deploy path:", deploy_path)
