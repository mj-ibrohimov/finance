from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.database.models import User, EmailVerificationToken, PasswordResetToken
from app.schemas.user import UserCreate, UserLogin, Token
from app.core.security import (
    verify_password, 
    get_password_hash, 
    create_access_token, 
    create_refresh_token,
    generate_verification_token,
    generate_reset_token
)
from app.services.email_service import send_verification_email, send_password_reset_email
import secrets

class AuthService:
    def __init__(self, db: Session):
        self.db = db
    
    def register_user(self, user_data: UserCreate) -> dict:
        """Register a new user."""
        # Check if user already exists
        existing_user = self.db.query(User).filter(
            (User.email == user_data.email) | (User.username == user_data.username)
        ).first()
        
        if existing_user:
            if existing_user.email == user_data.email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )
            else:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already taken"
                )
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        db_user = User(
            username=user_data.username,
            email=user_data.email,
            password=hashed_password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            about=user_data.about,
            is_active=True,
            is_verified=False
        )
        
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        
        # Generate email verification token
        verification_token = generate_verification_token()
        expires_at = datetime.utcnow() + timedelta(hours=24)
        
        db_token = EmailVerificationToken(
            user_id=db_user.user_id,
            token=verification_token,
            expires_at=expires_at
        )
        
        self.db.add(db_token)
        self.db.commit()
        
        # Send verification email
        try:
            send_verification_email(user_data.email, verification_token, user_data.first_name)
        except Exception as e:
            # Log error but don't fail registration
            print(f"Failed to send verification email: {e}")
        
        return {
            "message": "User registered successfully. Please check your email for verification.",
            "user_id": db_user.user_id
        }
    
    def login_user(self, user_data: UserLogin) -> Token:
        """Authenticate user and return tokens."""
        # Find user by email
        user = self.db.query(User).filter(User.email == user_data.email).first()
        
        if not user or not verify_password(user_data.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Account is deactivated"
            )
        
        # Create tokens
        access_token = create_access_token(
            data={"sub": str(user.user_id), "email": user.email}
        )
        refresh_token = create_refresh_token(
            data={"sub": str(user.user_id), "email": user.email}
        )
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer"
        )
    
    def verify_email(self, token: str) -> dict:
        """Verify user email with token."""
        # Find token
        db_token = self.db.query(EmailVerificationToken).filter(
            EmailVerificationToken.token == token
        ).first()
        
        if not db_token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid verification token"
            )
        
        # Check if token is expired
        if db_token.expires_at < datetime.utcnow():
            self.db.delete(db_token)
            self.db.commit()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Verification token expired"
            )
        
        # Update user verification status
        user = self.db.query(User).filter(User.user_id == db_token.user_id).first()
        if user:
            user.is_verified = True
            self.db.delete(db_token)
            self.db.commit()
            
            return {"message": "Email verified successfully"}
        
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
    
    def request_password_reset(self, email: str) -> dict:
        """Request password reset."""
        user = self.db.query(User).filter(User.email == email).first()
        
        if not user:
            # Don't reveal if email exists
            return {"message": "If the email exists, a password reset link has been sent."}
        
        # Delete existing reset tokens for this user
        self.db.query(PasswordResetToken).filter(
            PasswordResetToken.user_id == user.user_id
        ).delete()
        
        # Generate reset token
        reset_token = generate_reset_token()
        expires_at = datetime.utcnow() + timedelta(hours=1)
        
        db_token = PasswordResetToken(
            user_id=user.user_id,
            token=reset_token,
            expires_at=expires_at
        )
        
        self.db.add(db_token)
        self.db.commit()
        
        # Send reset email
        try:
            send_password_reset_email(user.email, reset_token, user.first_name)
        except Exception as e:
            print(f"Failed to send password reset email: {e}")
        
        return {"message": "If the email exists, a password reset link has been sent."}
    
    def reset_password(self, token: str, new_password: str) -> dict:
        """Reset user password with token."""
        # Find token
        db_token = self.db.query(PasswordResetToken).filter(
            PasswordResetToken.token == token,
            PasswordResetToken.used == False
        ).first()
        
        if not db_token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or used reset token"
            )
        
        # Check if token is expired
        if db_token.expires_at < datetime.utcnow():
            self.db.delete(db_token)
            self.db.commit()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Reset token expired"
            )
        
        # Update user password
        user = self.db.query(User).filter(User.user_id == db_token.user_id).first()
        if user:
            user.password = get_password_hash(new_password)
            db_token.used = True
            self.db.commit()
            
            return {"message": "Password reset successfully"}
        
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
    
    def refresh_token(self, refresh_token: str) -> Token:
        """Refresh access token using refresh token."""
        from app.core.security import verify_token
        
        try:
            payload = verify_token(refresh_token, token_type="refresh")
            user_id = payload.get("sub")
            email = payload.get("email")
            
            if not user_id:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token"
                )
            
            # Verify user still exists and is active
            user = self.db.query(User).filter(User.user_id == int(user_id)).first()
            if not user or not user.is_active:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="User not found or inactive"
                )
            
            # Create new tokens
            access_token = create_access_token(
                data={"sub": user_id, "email": email}
            )
            new_refresh_token = create_refresh_token(
                data={"sub": user_id, "email": email}
            )
            
            return Token(
                access_token=access_token,
                refresh_token=new_refresh_token,
                token_type="bearer"
            )
            
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            ) 