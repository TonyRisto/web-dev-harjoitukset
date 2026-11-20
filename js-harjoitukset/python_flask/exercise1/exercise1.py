from flask import Flask, request

app = Flask(__name__)
@app.route('/prime_number/<int:number>')

def isPrime(number):
    if number <= 1:
        isPrime = False

    else:
        iterator = 0

        for i in range(1, number + 1):
            if number % i == 0:
                iterator += 1

        if iterator == 2:
            isPrime = True
        else:
            isPrime = False

    return {
        "Number": number,
        "isPrime": isPrime
    }

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000)
