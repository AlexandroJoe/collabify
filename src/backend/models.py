from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True, index = True)
    email = Column(String, unique = True, index = True, nullable = False)
    password = Column(String)
    is_active = Column(Boolean, default = False)
    
    todo = relationship("Todo", back_populates = "owner")
    notes = relationship("Notes", back_populates = "owners")
    
class Todo(Base):
    __tablename__ = "todo"
    
    todo_id = Column(Integer, primary_key = True, index = True)
    title = Column(String, index = True, nullable = False)
    name = Column(String, index = True, nullable = False)
    duedate = Column(String, index = True, nullable = False)
    user_id = Column(Integer, ForeignKey("users.id"), index = True, nullable = False)
    
    owner = relationship("Users", back_populates = "todo")
    
class Notes(Base):
    __tablename__ = "notes"
    
    notes_id = Column(Integer, primary_key = True, index = True)
    title = Column(String, index = True, nullable = False)
    body = Column(String, index = True, nullable = False)
    time = Column(String, index = True, nullable = False)
    user_id = Column(Integer, ForeignKey("users.id"), index = True, nullable = False)
    
    owners = relationship("Users", back_populates = "notes")