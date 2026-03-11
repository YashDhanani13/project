# SIGNUP API CALL - QUICK REFERENCE

## Current Implementation in signup.jsx (Line 29-49)

```jsx
const onSubmit = async (data) => {
  setLoading(true);
  setApiError("");
  setApiSuccess("");

  try {
    // ✅ API CALL - Sends data to /api/auth/signup
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmpassword
    });

    setApiSuccess("Account created successfully! Redirecting to login...");
    console.log("Signup Response:", response.data);

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    reset();
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);

  } catch (error) {
    const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
    setApiError(errorMessage);
    console.error("Signup Error:", error);
  } finally {
    setLoading(false);
  }
};
```

---

## 7 Ways to Call Signup API

### Way 1: Simple POST ⭐ EASIEST
```javascript
const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
  email,
  password,
  confirmPassword
});
```

### Way 2: Using Config Object
```javascript
const response = await axios({
  method: "POST",
  url: `${API_BASE_URL}/auth/signup`,
  data: { email, password, confirmPassword },
  headers: { "Content-Type": "application/json" }
});
```

### Way 3: Using API Service ⭐ RECOMMENDED
```javascript
import { authAPI } from "../services/api";

const response = await authAPI.signup(email, password, confirmPassword);
```

### Way 4: With Built-in Error Handling
```javascript
try {
  const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, {
    email, password, confirmPassword
  });
  
  localStorage.setItem("authToken", data.token);
  return data;
  
} catch (error) {
  console.error(error.response?.data?.message);
  throw error;
}
```

### Way 5: In React Form ⭐ WHAT YOU HAVE
```javascript
const onSubmit = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmpassword
    });
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### Way 6: With Loading States
```javascript
setLoading(true);
try {
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
    email, password, confirmPassword
  });
  setSuccess("✅ Success");
} catch (error) {
  setError("❌ " + error.response?.data?.message);
} finally {
  setLoading(false);
}
```

### Way 7: Custom Axios Instance
```javascript
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

const response = await apiClient.post("/auth/signup", {
  email, password, confirmPassword
});
```

---

## API Endpoint Details

### Request
```
POST http://localhost:5000/api/auth/signup

Headers: {
  "Content-Type": "application/json"
}

Body: {
  "email": "user@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

### Success Response (200/201)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "email": "user@example.com"
  },
  "message": "Account created successfully"
}
```

### Error Response (400/409)
```json
{
  "message": "Email already exists"
}
```

---

## Step-by-Step: How Signup Works in Your App

1. **User fills form** → Email, Password, Confirm Password
2. **Clicks "Create Account"** → Triggers `onSubmit()`
3. **Form validation** → react-hook-form validates
4. **API Call** → `axios.post("/api/auth/signup", {...})`
5. **Waiting** → Button shows "Creating Account..."
6. **Backend processes** → Server creates user account
7. **Success/Error** → Green/Red message shows result
8. **Token stored** → `localStorage.setItem("authToken", token)`
9. **Redirect** → Automatically goes to /login after 2 seconds

---

## How to Test Signup API

### Option 1: Run in Browser Console
```javascript
// Paste this in console:
import('./src/examples/SignupExamples.js').then(m => m.testSignupAPI());
```

### Option 2: Use Postman
- URL: `http://localhost:5000/api/auth/signup`
- Method: POST
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

### Option 3: Test in Your Form
- Go to `/signup` page
- Fill in form with test email
- Click "Create Account"
- Check Network tab in DevTools (F12)

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Email already exists" | User already signed up | Use different email |
| "Passwords do not match" | Confirm password differs | Make sure both match |
| "Invalid email format" | Wrong email format | Use valid email format |
| Network error | Backend not running | Start backend server |
| CORS error | Frontend/backend mismatch | Check API_BASE_URL |
| 401 Unauthorized | No/invalid token | Login first |

---

## File Locations

- **Login**: `src/Components/login.jsx`
- **Signup**: `src/Components/signup.jsx` ← **YOU ARE HERE**
- **API Service**: `src/services/api.js`
- **Examples**: `src/examples/SignupExamples.js`

---

## Remember

✅ **Your signup.jsx already has working API call!**

The axios call on **line 31** of signup.jsx does:
```javascript
const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
  email: data.email,
  password: data.password,
  confirmPassword: data.confirmpassword
});
```

This sends the user data to your backend and waits for response!
