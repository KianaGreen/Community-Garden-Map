from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///garden.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Plot(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plot_key = db.Column(db.String(50), unique=True, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    gardener = db.Column(db.String(100), nullable=True)
    notes = db.Column(db.Text, nullable=True)


@app.route("/")
def home():
    return render_template("index.html")


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)