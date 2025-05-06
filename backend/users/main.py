from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from models import user


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class UserRegister(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/register", tags=["Auth"])
def register_user(data: UserRegister):
    existing_user = user.get_user_by_email(data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    user_id = user.create_user(data.email, data.password)
    return {"message": "User created", "user_id": user_id}

@app.post("/login", tags=["Auth"])
def login_user(data: UserLogin):
    db_user = user.get_user_by_email(data.email)
    if not db_user or not user.verify_password(data.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {"message": f"Welcome back, {db_user['email']}!"}

#@app.get("/ping")
#def ping():
#    return {"message": "pong"}

@app.get("/")
async def root():
    return {"message": "Welcome"}
