from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

# Shared properties
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "student"
    avatar_url: Optional[str] = None

# Properties received on API on creation
class UserCreate(UserBase):
    password: str

# Properties received on API update
class UserUpdate(UserBase):
    password: Optional[str] = None

# Properties to return to client
class User(UserBase):
    id: UUID
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
