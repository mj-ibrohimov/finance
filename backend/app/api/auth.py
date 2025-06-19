from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from app.core.database import get_db
from app.core.config import settings
from app.core.security import verify_password, create_access_token
from app.crud.user import get_user_by_username, get_user_by_email, create_user, verify_user_email
from app.schemas.auth import Token, EmailVerification
from app.schemas.user import UserCreate, UserResponse
from app.dependencies.auth import get_current_user

router = APIRouter()

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

async def send_verification_email(email: str, username: str):
    verification_link = f"{settings.FRONTEND_URL}/verify-email?email={email}"
    
    html = f"""
    <html>
        <body>
            <h2>Welcome to Finance Platform!</h2>
            <p>Hello {username},</p>
            <p>Thank you for registering. Please click the link below to verify your email:</p>
            <a href="{verification_link}">Verify Email</a>
            <p>If you didn't create this account, please ignore this email.</p>
        </body>
    </html>
    """
    
    message = MessageSchema(
        subject="Verify your email - Finance Platform",
        recipients=[email],
        body=html,
        subtype="html"
    )
    
    fm = FastMail(conf)
    await fm.send_message(message)

@router.post("/register", response_model=UserResponse)
async def register(
    user: UserCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    # Check if user already exists
    if get_user_by_email(db, email=user.email):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    if get_user_by_username(db, username=user.username):
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )
    
    # Create user
    db_user = create_user(db=db, user=user)
    
    # Send verification email
    background_tasks.add_task(send_verification_email, user.email, user.username)
    
    return db_user

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = get_user_by_username(db, username=form_data.username)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/verify-email")
async def verify_email(
    verification: EmailVerification,
    db: Session = Depends(get_db)
):
    user = get_user_by_email(db, email=verification.email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    if user.is_verified:
        raise HTTPException(
            status_code=400,
            detail="Email already verified"
        )
    
    verify_user_email(db, user.user_id)
    return {"message": "Email verified successfully"}

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user = Depends(get_current_user)):
    return current_user

@router.post("/resend-verification")
async def resend_verification(
    verification: EmailVerification,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    user = get_user_by_email(db, email=verification.email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    if user.is_verified:
        raise HTTPException(
            status_code=400,
            detail="Email already verified"
        )    
    background_tasks.add_task(send_verification_email, user.email, user.username)
    return {"message": "Verification email sent"}
