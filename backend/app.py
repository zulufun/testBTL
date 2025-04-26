from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_hcaptcha import hCaptcha
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import jwt, datetime, json, re

# Import SQLAlchemy instance
from models import db  
from LLm.model import model

# --- Flask App setup ---
app = Flask(__name__, static_folder="static", template_folder="templates")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yourdatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
bcrypt = Bcrypt(app)

# hCaptcha Configuration
app.config["HCAPTCHA_SITEKEY"] = "496c1d9a-7714-4c70-82be-8cc666046cd0"
app.config["HCAPTCHA_SECRET"] = "ES_d7ff3bff89274c69a0495ceab4116c5ay"
hcaptcha = hCaptcha(app)

# JWT Configuration
with open("secretkey/key.json", "r") as config_file:
    skey = json.load(config_file)
    app.config["SECRET_KEY"] = skey["SECRET_KEY"]

# MongoDB Configuration (đổi tên biến để tránh xung đột)
mongo_client = MongoClient("mongodb://localhost:27017/")
mongo_db = mongo_client["user_auth_db"]
users_collection = mongo_db["users"]

# --- Routes ---
def validate_password(password):
    if not password or not password[0].isupper(): return False
    if len(password) < 8: return False
    if not re.search(r"[A-Za-z0-9]", password): return False
    if not re.search(r"[\W_]", password): return False
    return True

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    captcha_response = data.get("captcha_response")

    if not all([username, password, captcha_response]):
        return jsonify({"error": "Missing fields"}), 400

    if not validate_password(password):
        return jsonify({
            "error": "Password must: First letter capitalized, ≥8 chars, alphanumeric + symbol."
        }), 400

    if not hcaptcha.verify(captcha_response):
        return jsonify({"error": "Invalid captcha"}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 400

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    users_collection.insert_one({"username": username, "password": hashed})
    return jsonify({"message": "User registered successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    captcha_response = data.get("captcha_response")

    if not all([username, password, captcha_response]):
        return jsonify({"error": "Missing fields"}), 400

    if not hcaptcha.verify(captcha_response):
        return jsonify({"error": "Invalid captcha"}), 400

    user = users_collection.find_one({"username": username})
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid username or password"}), 401

    token = jwt.encode({
        "user_id": str(user["_id"]),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config["SECRET_KEY"], algorithm="HS256")

    return jsonify({"token": token, "message": "Welcome to the dashboard"}), 200

@app.route("/protected", methods=["GET"])
def protected():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Token is missing"}), 401
    try:
        decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        return jsonify({"message": "Access granted", "user_id": decoded["user_id"]}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    response = model.send_message(data["message"])
    return jsonify({"response": response.text})

# --- SQLAlchemy init & create tables ---
db.init_app(app)
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
