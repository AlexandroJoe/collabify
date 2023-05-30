from pydantic import BaseModel, EmailStr, Field

class Users(BaseModel):
    email: EmailStr
    
class CreateUserSchema(Users):
    hashed_password: str = Field(alias="password")
    
class UserSchema(Users):
    id: int
    is_active: bool = Field(default=False)

    class Config:
        orm_mode = True
        
class UserLoginSchema(BaseModel):
    email: EmailStr = Field(alias="username")
    password: str 