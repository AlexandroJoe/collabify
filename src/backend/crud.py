from sqlalchemy.orm import Session
from sqlalchemy import select
import models, schemas
from pydantic import EmailStr
import bcrypt
import sqlite3
from sqlite3 import Error
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from passlib.context import CryptContext

SECRET_KEY = "asecretkeysisasecretkeysothisisasecret"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.Users).filter(models.Users.id == user_id).first()

def get_user_by_email(db: Session, email: EmailStr):
    return db.query(models.Users).filter(models.Users.email == email).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.Users).filter(models.Users.email == email).first()

def get_all_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Users).offset(skip).limit(limit).all()

def create_user(db: Session, email: EmailStr, password: str):
    db_user = models.Users(email = email, password = password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session, email):
    user = select([
        models.Users.id,
        models.Users.email,
        models.Users.password,
        models.Users.is_active
    ]).where(models.Users.email == email)
    user_data = db.execute(user).fetchone()
    if user_data is not None:
        id, email, password, is_active = user_data
        user_dict = {
            "id": id,
            "email": email,
            "password": password,
            "is_active": is_active
        }
        return schemas.UserLogin(**user_dict)
    return None

def verify_password(password, hashed_password):
    return pwd_context.verify(password, hashed_password)

def auth_user(db: Session, email, password):
    user = get_user_by_email(db, email)
    if not user:
        return False
    check_pass = verify_password(password, user.password)
    if not check_pass:
        return False
    return user

def create_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes = 15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)
    return encoded_jwt

def delete_user(db: Session, id: int):
    db_user = db.get(models.Users, id)
    db.delete(db_user)
    db.commit()
    return db_user