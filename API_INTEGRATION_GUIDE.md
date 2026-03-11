# API Integration Guide

## Overview
Authentication APIs have been integrated into the Login and Signup components using axios. The components now communicate with your backend API.

## Setup Instructions

### 1. Install Axios (if not already installed)
```bash
npm install axios
```

### 2. Configure API Base URL

#### Option A: Environment Variables (Recommended)
Create a `.env` file in your project root:
```
REACT_APP_API_URL=http://localhost:5000/api
```

For production:
```
REACT_APP_API_URL=https://your-api-domain.com/api
```

#### Option B: Update in api.js
Edit `src/services/api.js` and change the `API_BASE_URL`:
```javascript
const API_BASE_URL = "http://your-api-url/api";
```

Or update directly in components:
- Login.jsx: Line 20
- Signup.jsx: Line 24

### 3. Backend API Endpoints Required

#### Login Endpoint
**POST** `/api/auth/login`
- Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- Response (Success):
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  }
}
```
- Response (Error):
```json
{
  "message": "Invalid credentials"
}
```

#### Signup Endpoint
**POST** `/api/auth/signup`
- Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```
- Response (Success):
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  }
}
```
- Response (Error):
```json
{
  "message": "Email already exists"
}
```

## Features Implemented

### ✅ Login Component
- Email validation
- Password validation (min 6 characters)
- Loading state during API call
- Success message with redirect
- Error message display
- Token storage in localStorage
- Auto-redirect to home on success

### ✅ Signup Component
- Email validation (valid email format)
- Password validation (min 8 characters)
- Confirm password validation
- Password match validation
- Loading state during API call
- Success message with redirect to login
- Error message display
- Token storage in localStorage
- Form reset on success

### ✅ API Service (src/services/api.js)
- Axios instance with baseURL
- Request interceptor (auto-attach auth token)
- Response interceptor (auto-logout on 401)
- Pre-built auth API methods
- Generic API call function
- Error handling

## Usage Examples

### Using the API Service
```javascript
import { authAPI } from "../services/api";

// Login
const response = await authAPI.login("user@example.com", "password");

// Signup
const response = await authAPI.signup("user@example.com", "password", "password");

// Logout
authAPI.logout();
```

### Using Generic API Call
```javascript
import { apiCall } from "../services/api";

// GET request
const data = await apiCall("/users/profile", "GET");

// POST request
const data = await apiCall("/orders", "POST", { items: [] });

// PUT request
const data = await apiCall("/user/profile", "PUT", { name: "John" });
```

## Validation Rules

### Login
- Email: Required, valid email format
- Password: Required, minimum 6 characters

### Signup
- Email: Required, valid email format
- Password: Required, minimum 8 characters
- Confirm Password: Must match password field
- Terms: Checkbox (optional, can be required)

## Error Handling

Errors are caught and displayed to users:
- Network errors
- Server errors (4xx, 5xx)
- Validation errors from backend
- Timeout errors (10 second default)

## Authentication Token Management

Tokens are stored in `localStorage` as `authToken`:
```javascript
// Get token
const token = localStorage.getItem("authToken");

// Remove token on logout
localStorage.removeItem("authToken");
```

The API service automatically includes the token in all requests:
```
Authorization: Bearer {token}
```

## Testing

### Test Login
```
Email: test@example.com
Password: Test123456
```

### Test Signup
```
Email: newuser@example.com
Password: Secure123456
Confirm: Secure123456
```

## Troubleshooting

### CORS Error
If you get a CORS error, ensure your backend allows requests from your frontend URL.

### 401 Unauthorized
The token may be expired. User will be automatically redirected to login.

### Network Error
Check if the API URL is correct and the backend server is running.

### Environment Variables Not Working
Restart your development server after creating/modifying `.env` file.

## Next Steps

1. Set up your backend API endpoints
2. Configure the API base URL
3. Test login and signup flows
4. Add more API endpoints as needed using the api.js service
5. Implement protected routes (requires authentication)

## Support
For more information, refer to:
- Axios Documentation: https://axios-http.com
- React Hook Form: https://react-hook-form.com
