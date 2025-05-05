from pymongo import MongoClient
from bson.objectid import ObjectId
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client.quizgpt_db
users_collection = db.users

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(email, password):
    hashed_password = pwd_context.hash(password)
    user = {
        "email": email,
        "password": hashed_password
    }
    result = users_collection.insert_one(user)
    return str(result.inserted_id)


def get_user_by_email(email):
    return users_collection.find_one({"email": email})


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_user_by_id(user_id):
    try:
        return users_collection.find_one({"_id": ObjectId(user_id)})
    except Exception:
        return None
