from flask import Flask, jsonify, render_template, request
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

# Populate the database with sample data the first time the application runs.
def seed_database():
    if Plot.query.count() > 0:
        return

    plots = [
        Plot(
            plot_key="1",
            title="Plot 1",
            status="Assigned",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="2",
            title="Plot 2",
            status="Available",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="3",
            title="Plot 3",
            status="Assigned",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="4",
            title="Plot 4",
            status="Assigned",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="5",
            title="Plot 5",
            status="Available",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="6",
            title="Plot 6",
            status="Assigned",
            gardener="",
            notes="Planting cucumbers"
        ),
        Plot(
            plot_key="7",
            title="Plot 7",
            status="Available",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="8",
            title="Plot 8",
            status="Assigned",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="9",
            title="Plot 9",
            status="Available",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="10",
            title="Plot 10",
            status="Assigned",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="11",
            title="Plot 11",
            status="Available",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="12",
            title="Plot 12",
            status="Assigned",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="13",
            title="Plot 13",
            status="Available",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="14",
            title="Plot 14",
            status="Assigned",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="15",
            title="Plot 15",
            status="Available",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="16",
            title="Plot 16",
            status="Assigned",
            gardener="",
            notes=""
        ),
        Plot(
            plot_key="herb_garden",
            title="Community Herb Garden",
            status="Shared Area",
            gardener="Community",
            notes="Available for all gardeners."
        ),
        Plot(
            plot_key="berry_plot",
            title="Community Berry Plot",
            status="Shared Area",
            gardener="Community",
            notes="Blueberries and raspberries."
        )
    ]

    db.session.add_all(plots)
    db.session.commit()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/plots")
def get_plots():
    plots = Plot.query.all()

    plot_data = {}

    for plot in plots:
        plot_data[plot.plot_key] = {
            "title": plot.title,
            "status": plot.status,
            "gardener": plot.gardener or "",
            "notes": plot.notes or ""
        }

    return jsonify(plot_data)


@app.route("/api/plots/<plot_key>", methods=["PUT"])
def update_plot(plot_key):
    plot = Plot.query.filter_by(plot_key=plot_key).first()

    if plot is None:
        return jsonify({"error": "Plot not found"}), 404

    data = request.get_json()

    plot.status = data.get("status", plot.status)
    plot.gardener = data.get("gardener", plot.gardener)
    plot.notes = data.get("notes", plot.notes)

    db.session.commit()

    return jsonify({
        "title": plot.title,
        "status": plot.status,
        "gardener": plot.gardener or "",
        "notes": plot.notes or ""
    })


with app.app_context():
    db.create_all()
    seed_database()


if __name__ == "__main__":
    app.run(debug=True, port=5001)