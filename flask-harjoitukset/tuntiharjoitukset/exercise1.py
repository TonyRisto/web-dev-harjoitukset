from flask import Flask, request

app = Flask(__name__)

@app.route('/function/<number>')

def shoutHello(number):
    try:
        return "Hello World " * int(number)
    except ValueError:
        return "Ei ole sallittu numero"

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000, use_reloader=True)