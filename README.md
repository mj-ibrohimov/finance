# FinanceHub - Financial Education Platform

A comprehensive financial education platform built with Next.js and FastAPI, designed to help students and professionals learn financial markets through hands-on experience.

## 🚀 Features

### MVP Features Implemented

#### User Management
- ✅ User registration with email verification
- ✅ Secure authentication with JWT tokens
- ✅ Password reset functionality
- ✅ User profiles with education and employment history
- ✅ Social media profile integration

#### Financial Education
- 📊 Demo trading with virtual money
- 📈 Real-time market data visualization
- 📝 Financial analysis sharing and approval system
- 👥 Team collaboration for portfolio management
- 💼 Portfolio monitoring and tracking

#### Content Management
- 📰 Financial news and articles
- 👍 Like and comment system for posts
- 🔍 Expert analyst ratings (ANRs)
- ✅ Content moderation and approval workflow

## 🛠️ Tech Stack

### Frontend
- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React Query** - Server state management
- **Sonner** - Toast notifications

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Primary database
- **SQLAlchemy** - ORM for database operations
- **JWT** - Authentication and authorization
- **SMTP** - Email verification and notifications
- **Alembic** - Database migrations

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── articles/          # Article pages
│   └── ...
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── ui/               # Reusable UI components (minimized)
│   └── ...
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Configuration and security
│   │   ├── database/     # Database models and connection
│   │   ├── schemas/      # Pydantic schemas
│   │   └── services/     # Business logic
│   └── requirements.txt
└── lib/                  # Utility functions
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- PostgreSQL 12+

### 1. Clone Repository

```bash
git clone <repository-url>
cd finance-platform
```

### 2. Setup Environment

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/financeplatform

# JWT Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=FinanceHub

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Environment
ENVIRONMENT=development
```

### 3. Install Dependencies

```bash
# Install all dependencies (frontend + backend)
npm run setup

# Or install separately
npm install                    # Frontend dependencies
npm run install:backend       # Backend dependencies
```

### 4. Setup Database

```bash
# Create PostgreSQL database
createdb financeplatform

# Initialize database tables
npm run db:setup
```

### 5. Run Development Server

```bash
# Run both frontend and backend
npm run dev:all

# Or run separately
npm run dev        # Frontend only (localhost:3000)
npm run backend    # Backend only (localhost:8000)
```

## 📊 Database Schema

The platform uses a comprehensive database schema supporting:

- User management with profiles
- Team structures and roles
- Social media integration
- Post creation with approval workflows
- Like and comment systems
- Education and employment history
- Email verification tokens

Key tables:
- `users` - User accounts and authentication
- `posts` - User-generated content
- `likes` / `comments` - Social interactions
- `teams` / `team_member_roles` - Team management
- `educations` / `employments` - User background
- `email_verification_tokens` - Email verification

## 🔐 Authentication Flow

1. **Registration**: User creates account → Email verification sent
2. **Email Verification**: User clicks link → Account activated
3. **Login**: User authenticates → JWT tokens issued
4. **Token Refresh**: Automatic token refresh for seamless experience
5. **Password Reset**: Secure password reset via email

## 🧪 Testing

```bash
# Run frontend linting
npm run lint

# Test backend endpoints
cd backend
pytest

# Test API endpoints manually
curl http://localhost:8000/docs  # Swagger UI
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
npm start
```

### Backend (Docker)
```dockerfile
FROM python:3.9
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🎯 MVP Roadmap

### Phase 1: Core Authentication ✅
- [x] User registration and login
- [x] Email verification
- [x] Password reset
- [x] JWT authentication
- [x] User profiles

### Phase 2: Content Management 🔄
- [ ] Post creation and approval
- [ ] Like and comment system
- [ ] Content moderation
- [ ] File uploads

### Phase 3: Financial Features 📅
- [ ] Demo trading system
- [ ] Portfolio management
- [ ] Real-time market data
- [ ] Financial charting

### Phase 4: Team Features 📅
- [ ] Team creation and management
- [ ] Real money portfolio collaboration
- [ ] Role-based permissions
- [ ] Team analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔧 Configuration

### Email Setup
For email verification to work, configure SMTP settings in your `.env` file. For Gmail:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `SMTP_PASSWORD`

### Database Configuration
Ensure PostgreSQL is running and accessible. The application will create tables automatically on startup.

## 🚨 Security Notes

- Change the `SECRET_KEY` in production
- Use strong database passwords
- Enable HTTPS in production
- Regularly update dependencies
- Monitor for security vulnerabilities

## 📞 Support

For questions or issues:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ for financial education** 