# Admin Login Test Guide

## How to Test Admin Login

### Step 1: Clear Previous Sessions
Before testing, clear all previous login data:

1. Open browser DevTools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Find "Local Storage" → Your localhost URL
4. Click "Clear All" or delete all items
5. Close and reopen browser (or hard refresh with Ctrl+Shift+R)

### Step 2: Navigate to Login
Go to: `http://localhost:5173/login`

### Step 3: Enter Admin Credentials
- **Email:** `admin@athlixir.com`
- **Password:** `Athlixir@123`

### Step 4: Expected Behavior
After clicking "Verify Identity":
1. You should see "Admin Logged in successfully" in the browser console (F12 → Console)
2. The page will reload and redirect to `/admin/dashboard`
3. You should see the Admin Portal with full sidebar

## Troubleshooting

### Issue: Page doesn't redirect
**Check:**
1. Open Console (F12) - Look for "Admin Logged in successfully"
2. Check Local Storage - Should have `user_role: "admin"`
3. If you see the message but no redirect, check for JavaScript errors

### Issue: "Invalid email or access key" error
**Check:**
1. Verify `.env` file has:
   ```
   VITE_ADMIN_EMAIL=admin@athlixir.com
   VITE_ADMIN_PASSWORD=Athlixir@123
   ```
2. Restart dev server:
   - Stop: Ctrl+C in terminal
   - Start: `npm run dev`
3. Hard refresh browser: Ctrl+Shift+R

### Issue: Redirects to athlete/coach/user portal
**Check:**
1. Clear Local Storage completely
2. Make sure you're entering exact credentials (case-sensitive)
3. Check browser console for errors

## Verify Admin Access

Once logged in, you should be able to:
1. ✅ See "Admin Portal" in the header
2. ✅ Navigate to all admin pages via sidebar
3. ✅ See "Admin User" and "System Admin" in top-right
4. ✅ Access: Dashboard, Users, Verify Athletes, Opportunities, etc.

## Manual Debug Steps

### Step 1: Check Environment Variables
In your browser console, type:
```javascript
console.log(import.meta.env.VITE_ADMIN_EMAIL);
console.log(import.meta.env.VITE_ADMIN_PASSWORD);
```
Should show your admin credentials.

### Step 2: Check AuthContext
After login, in console type:
```javascript
localStorage.getItem('user_role')
```
Should return: `"admin"`

### Step 3: Force Admin Session
If login still doesn't work, manually set admin session:
```javascript
localStorage.setItem('user_role', 'admin');
window.location.href = '/admin/dashboard';
```

## What Was Fixed

1. ✅ **AuthContext** now provides `currentUser` and `userRole`
2. ✅ **Admin authentication** creates a mock admin user when credentials match
3. ✅ **RoleProtectedRoute** properly checks admin role
4. ✅ **Login page** uses `window.location.href` to force reload after admin login
5. ✅ **Logout** clears admin session properly

## Testing Different Roles

To test other portals after admin:
1. Click "Sign Out" in admin portal
2. Login with:
   - Regular Firebase email/password → Athlete Portal
   - (Set role in localStorage to test coach/user)

## Quick Admin Login Script

Copy this into browser console for instant admin login:
```javascript
localStorage.setItem('user_role', 'admin');
window.location.href = '/admin/dashboard';
```

## Success Indicators

✅ Console shows: "Admin Logged in successfully"  
✅ localStorage has: `user_role: "admin"`  
✅ URL becomes: `/admin/dashboard`  
✅ Sidebar shows all 10 admin menu items  
✅ Can navigate to all admin pages  
✅ Logout button works and returns to login  

---

If admin login still doesn't work after following these steps, check the browser console for specific error messages and let me know!
