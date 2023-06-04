from pydantic import BaseModel, EmailStr, Field

class Users(BaseModel):
    email: EmailStr | None = None
    
    class Config:
        orm_mode = True
    
class CreateUserSchema(Users):
    password: str
        
class UserLoginSchema(BaseModel):
    id: int 
    email: EmailStr| None = None
    is_active: bool | None = None
    
class UserSchema(Users):
    id: int
    is_active: bool = Field(default=False)

    class Config:
        orm_mode = True
    
class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    email: EmailStr = None
    
class Todo(BaseModel):
    todo_id: int
    title: str
    name: str
    duedate: str
    
    class Config:
        orm_mode = True
        
class UserTodo(Todo):
    user_id: int