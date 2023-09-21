from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, World!"


@app.route("/import-recipe", methods=["POST"])
def importRecipe():
    url = request.json["url"]
    print(url)

    return "Recipe imported!"
