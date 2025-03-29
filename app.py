from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, PotentialPartnerships



app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app)
db.init_app(app)

# Ensure tables are created
with app.app_context():
    db.create_all()

@app.route("/api/partners")
def get_partners():
    partners = PotentialPartnerships.query.all()
    result = []
    for p in partners:
        result.append({
            "id": p.id,
            "name": p.name,
            "county": "County1",
            "status": "current",
            "contact_date": p.contact_date or "N/A"
        })
    return jsonify(result)

@app.route("/api/add-simple-partner", methods=["POST"])
def add_simple_partner():
    existing = PotentialPartnerships.query.filter_by(name="Community Partner A").first()
    if existing:
        return {"message": "Already exists."}

    partner = PotentialPartnerships(
        name="Community Partner A",
        county="County 1",
        status="current",
        contact_date="2025-1-10"
    )
    db.session.add(partner)
    db.session.commit()
    return {"message": "Simple partner added."}


@app.route("/api/clear-all", methods=["DELETE"])
def clear_all():
    db.session.query(PotentialPartnerships).delete()
    db.session.commit()
    return {"message": "All partnerships deleted."}


if __name__ == "__main__":
    app.run(debug=True)

