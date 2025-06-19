# Finance Platform Backend

A comprehensive FastAPI backend for a finance platform with user management, posts, and social features.

## 🚀 Features Implemented

### ✅ Authentication System
- **User Registration** with email verification
- **Login/Logout** with JWT tokens
- **Email Verification** via SMTP
- **Password Security** with bcrypt hashing
- **Role-Based Access Control** (user, team_member, head_of_team, admin)

### ✅ User Profile System
- **Complete User Profiles** with bio, education, employment
- **Profile Management** (view, edit, update)
- **Social Media Links** integration
- **Team Role Assignment**

### ✅ Post Management
- **Create Posts** (analytical reports)
- **Approval Workflow** (head of team approval required)
- **Like/Unlike Posts**
- **Comment System**
- **Post Statistics** (automatic like/comment counting)

### ✅ Database Schema
Based on your provided schema with all relationships:
- User management (user, bio, education, employment, university, company)
- Social features (posts, likes, comments, post_stats)
- Team structure (teams, team_member_role)
- Social profiles (user_social_profiles, social_network)

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Database Setup
Create a PostgreSQL database:
```sql
CREATE DATABASE finance_platform;
CREATE USER finance_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE finance_platform TO finance_user;
```

### 3. Environment Configuration
Copy and configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
# Database
DATABASE_URL=postgresql://finance_user:your_password@localhost:5432/finance_platform

# JWT
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email (Gmail SMTP recommended)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=your-email@gmail.com
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
MAIL_FROM_NAME=Finance Platform

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 4. Database Migrations
Initialize and run migrations:
```bash
# Initialize Alembic (if not done)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

### 5. Create Initial Data
You may want to create some initial team roles:
```sql
INSERT INTO team_member_role (name) VALUES 
('user'),
('team_member'),
('head_of_team'),
('admin');
```

### 6. Start the Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns JWT token)
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/resend-verification` - Resend verification email
- `GET /api/auth/me` - Get current user info

### Users (`/api/users`)
- `GET /api/users/` - List all verified users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `GET /api/users/{user_id}` - Get specific user profile

### Posts (`/api/posts`)
- `GET /api/posts/` - List approved posts
- `GET /api/posts/pending` - List pending posts (head of team only)
- `POST /api/posts/` - Create new post
- `GET /api/posts/{post_id}` - Get specific post with stats
- `PUT /api/posts/{post_id}` - Update post (author only)
- `POST /api/posts/{post_id}/approve` - Approve post (head of team only)
- `DELETE /api/posts/{post_id}` - Delete post
- `POST /api/posts/{post_id}/like` - Like a post
- `DELETE /api/posts/{post_id}/like` - Unlike a post
- `POST /api/posts/{post_id}/comments` - Add comment
- `GET /api/posts/{post_id}/comments` - Get post comments
- `GET /api/posts/user/{user_id}` - Get user's posts

### Teams (`/api/teams`)
- `GET /api/teams/roles` - List team roles
- `GET /api/teams/` - List teams

## 🔐 Authentication Flow

1. **Register**: User creates account → Email verification sent
2. **Verify Email**: User clicks verification link
3. **Login**: User gets JWT token
4. **Access Protected Routes**: Include `Authorization: Bearer <token>` header

## 🎯 User Workflow

1. **Registration**: User signs up with email/username/password
2. **Email Verification**: User verifies email via SMTP
3. **Profile Setup**: User can update profile information
4. **Create Posts**: User creates analytical reports/posts
5. **Approval Process**: Head of team approves posts before publication
6. **Social Interaction**: Users can like and comment on approved posts

## 🔧 Role-Based Permissions

- **user**: Can create posts, like, comment (posts need approval)
- **team_member**: Same as user + additional team features
- **head_of_team**: Can approve/reject posts + all user features
- **admin**: Full system access

## 📊 Database Features

- **Automatic Timestamps**: created_at, updated_at
- **Soft Deletes**: User deactivation instead of deletion
- **Relationship Management**: Proper foreign keys and cascading
- **Statistics Tracking**: Automatic like/comment counting
- **Data Integrity**: Constraints and validations

## 🚀 Ready for Production

The backend includes:
- ✅ Input validation with Pydantic
- ✅ SQL injection protection with SQLAlchemy ORM
- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Email verification system
- ✅ Role-based access control
- ✅ Comprehensive error handling
- ✅ Database migrations with Alembic
- ✅ CORS configuration for frontend integration

## 🔗 Frontend Integration

The backend is configured to work with your Next.js frontend at `http://localhost:3000`. Update the `FRONTEND_URL` in your `.env` file if needed.

## 📝 Next Steps

1. Set up PostgreSQL database
2. Configure email server (Gmail SMTP recommended)
3. Run database migrations
4. Test API endpoints using the interactive docs
5. Integrate with your Next.js frontend
6. Add demo trading functionality (future enhancement)

The backend is production-ready and includes all the features you requested for user authentication, profile management, and post creation with approval workflows.