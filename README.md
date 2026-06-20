# Dee's Learning Hub

A full-stack e-learning web application that provides a secure and user-friendly platform for students to register, log in, reset passwords via email OTP verification, and access their learning dashboard.

##  Features

- User Registration
- Secure Login Authentication
- JWT Authentication
- Password Hashing with bcrypt
- Forgot Password
- Email OTP Verification
- Password Reset
- Student Dashboard
- Dynamic Success & Error Modals
- Responsive User Interface
- MongoDB Database Integration
- Backend API with Express.js

##  Built With

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JSON Web Token (JWT)
- bcrypt

### Email Service
- Nodemailer

### Deployment
- Backend: Render
- Database: MongoDB Atlas

##  Project Structure

```
client/
├── HTML
├── CSS
└── JavaScript

server/
├── controllers
├── middleware
├── models
├── routes
├── utils
└── server.js
```

## Authentication Flow

1. User creates an account.
2. Password is securely hashed before storage.
3. User logs in and receives a JWT.
4. Protected routes require a valid token.
5. Users who forget their password can request a reset.
6. A 6-digit OTP is sent to their email.
7. OTP is verified before allowing password reset.

## Future Improvements

- Tutor Dashboard
- Admin Dashboard
- Course Management
- Quiz System
- Student Progress Tracking
- Assignment Submission
- Notifications
- Payment Integration

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/dees-learning-hub.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Run the server

```bash
npm start
```

## Screenshots

Add screenshots of:
- Home Page
- Login
- Signup
- Forgot Password
- OTP Verification
- Student Dashboard

## Author

**Ransom Siyeofori George**

Aspiring Full-Stack Developer passionate about building secure, responsive, and user-friendly web applications using JavaScript, Node.js, Express, and MongoDB.

## License

This project is open source and available under the MIT License.
