from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, PotentialPartnerships
from functions import potential_partnerships_sheet_reader
import os


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
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
            "county": p.county,
            "status": p.status,
            "lastUpdated": p.contact_date,
            "contacts":[
            { "name": 'testname', "address": 'testaddy', "phone": 'testphone', "email": 'testemail' }
        ]
        })
        print(p.contact_date)

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
        contact_date="2025-1-10",
    )
    db.session.add(partner)
    db.session.commit()
    return {"message": "Simple partner added."}


@app.route("/api/clear-all", methods=["DELETE", "GET"])
def clear_all():
    db.session.query(PotentialPartnerships).delete()

    db.session.commit()
    return {"message": "All partnerships deleted."}

#upload Previous Data
@app.route("/api/upload-partners", methods=["POST"])
def upload_partners():
    if "file" not in request.files:
        return jsonify({"message": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"message": "No file selected"}), 400
    # Save the file temporarily
    temp_dir = "temp_files"
    os.makedirs(temp_dir, exist_ok=True)
    temp_path = os.path.join(temp_dir, file.filename)
    file.save(temp_path)
    try:
        potential_partnerships_sheet_reader(temp_path)
    except Exception as e:
        return jsonify({"message": "Error processing file", "error": str(e)}), 500
    finally:
        os.remove(temp_path)
    return jsonify({"message": "File uploaded and data imported successfully."})

#add Community Partner Data
@app.route("/api/partner", methods=["POST"])
def add_partner():
    data = request.json
    new_partner = PotentialPartnerships(
        name=data.get("name"),
        organization_name=data.get("organization_name"),
        county=data.get("county"),
        status=data.get("status"),
        contact_date=data.get("contact_date")
    )
    db.session.add(new_partner)
    db.session.commit()
    return jsonify({
        "message": "Partner added successfully.",
        "partner": {
            "id": new_partner.id,
            "name": new_partner.name,
            "county": new_partner.county,
            "status": new_partner.status,
            "lastUpdated": new_partner.contact_date
        }
    })

#delete Community Partner Data
@app.route("/api/partner/<int:id>", methods=["DELETE"])
def delete_partner(id):
    partner = PotentialPartnerships.query.get(id)
    if not partner:
        return jsonify({"message": "Partner not found."}), 404
    db.session.delete(partner)
    db.session.commit()
    return jsonify({"message": "Partner deleted successfully."})

if __name__ == "__main__":
    app.run(debug=True)

