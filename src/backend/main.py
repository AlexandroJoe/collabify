from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import crud, models, schemas
from database import engine, get_db
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import bcrypt
from pydantic import EmailStr
from fastapi import Body, Depends
from jose import JWTError, jwt

models.Base.metadata.create_all(bind=engine)

collabify = FastAPI()
        
@collabify.get("/")
def index():
    return {"Collabify" : "Productive App to Help Your Study"}

@collabify.post("/signup/", response_model=schemas.Users)
async def signup(
    email: EmailStr,
    password: str,
    session: Session = Depends(get_db),
):
    bytePwd = password.encode('utf-8')
    mySalt = bcrypt.gensalt()
    hashed_pass = bcrypt.hashpw(bytePwd, mySalt)
    db_user = crud.get_user_by_email(session, email = email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(session, email = email, password = hashed_pass)


