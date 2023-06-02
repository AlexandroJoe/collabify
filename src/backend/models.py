from sqlalchemy import Boolean, Column, Integer, String, UniqueConstraint
from database import Base


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    email = Column(String, unique = True, index = True, nullable = False)
    password = Column(String)
    is_active = Column(Boolean, default = False)