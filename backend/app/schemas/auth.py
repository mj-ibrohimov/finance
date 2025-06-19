from pydantic import BaseModel, EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str

class UserLogin(BaseModel):
    username: str
    password: str

class EmailVerification(BaseModel):
    email: EmailStr

class PasswordReset(BaseModel):
    email: EmailStr