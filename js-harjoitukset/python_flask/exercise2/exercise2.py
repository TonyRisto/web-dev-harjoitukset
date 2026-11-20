from flask import Flask, jsonify
import json

try:
    with open('dictionary.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
except FileNotFoundError:
    print("Tiedostoa ei löydy.")

app = Flask(__name__)
app.json.compact = False

@app.route('/translate/<word>')
def translator(word):
    try:
        return {
            "English": word.lower(),
            "Finnish": data[word.lower()]
        }
    except KeyError:
        return {
            "error": "Word not found"
        }

@app.route('/words')
def dictionaryWords():
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, use_reloader=True)