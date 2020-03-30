from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def hello():
    return render_template("index.html")


@app.route("/puzzle/")
def puzzle():
    return render_template("puzzle.html")


@app.route("/snake/")
def snake():
    return render_template("snake.html")


@app.route("/contact/")
def music():
    return render_template("music.html")


@app.route("/about/")
def about():
    return render_template("about.html")

@app.errorhandler(404)
def not_found_error(error):
    return render_template('error.html'), 404


if __name__ == '__main__':
    app.run()
