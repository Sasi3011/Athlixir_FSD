# 🚀 VERCEL DEPLOYMENT GUIDE

## ✅ Pre-Deployment Checklist

All these are already done for you:
- ✅ `vercel.json` created (fixes 404 on refresh)
- ✅ Firebase configured
- ✅ Environment variables in `.env`
- ✅ Build configuration ready

---

## 📦 STEP 1: Install Vercel CLI (Optional)

You can deploy via:
- **Option A:** Vercel Dashboard (Recommended - Easier)
- **Option B:** Vercel CLI (Command line)

### Option B - CLI Installation:
```bash
npm install -g vercel
```

---

## 🌐 STEP 2A: Deploy via Vercel Dashboard (EASIEST)

### 1. **Go to Vercel**
- Visit: [https://vercel.com](https://vercel.com)
- Click **"Sign Up"** or **"Log In"** (use GitHub, GitLab, or Bitbucket)

### 2. **Import Project**
- Click **"Add New"** → **"Project"**
- Click **"Import Git Repository"**
- If not connected, connect your GitHub/GitLab account
- Select your **Athlixir_Website** repository

### 3. **Configure Project**
- **Framework Preset:** Vite ✅ (should auto-detect)
- **Root Directory:** `./` (leave as is)
- **Build Command:** `npm run build` ✅
- **Output Directory:** `dist` ✅
- **Install Command:** `npm install` ✅

### 4. **Add Environment Variables**
Click **"Environment Variables"** and add these **one by one**:

```
VITE_FIREBASE_API_KEY = AIzaSyCvFNh-R3Ha4MM6pvZ_R6Bf55ES4cUOG8Y
VITE_FIREBASE_AUTH_DOMAIN = athlixir-82148.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = athlixir-82148
VITE_FIREBASE_STORAGE_BUCKET = athlixir-82148.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 908727181890
VITE_FIREBASE_APP_ID = 1:908727181890:web:da8f703ed26d33c732c3db
VITE_FIREBASE_MEASUREMENT_ID = G-CK1BH0W08G
VITE_ADMIN_EMAIL = admin@athlixir.com
VITE_ADMIN_PASSWORD = Athlixir@123
```

**Important:** Make sure each variable starts with `VITE_`

### 5. **Deploy!**
- Click **"Deploy"**
- Wait 2-3 minutes for build to complete
- Your site will be live at: `https://your-project-name.vercel.app`

---

## 🚀 STEP 2B: Deploy via CLI (ALTERNATIVE)

### 1. **Login to Vercel**
```bash
vercel login
```

### 2. **Deploy**
In your project directory, run:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → athlixir (or your choice)
- **Directory?** → `./` (press Enter)
- **Override settings?** → No

### 3. **Add Environment Variables**
```bash
vercel env add VITE_FIREBASE_API_KEY
# Paste: AIzaSyCvFNh-R3Ha4MM6pvZ_R6Bf55ES4cUOG8Y

vercel env add VITE_FIREBASE_AUTH_DOMAIN
# Paste: athlixir-82148.firebaseapp.com

vercel env add VITE_FIREBASE_PROJECT_ID
# Paste: athlixir-82148

vercel env add VITE_FIREBASE_STORAGE_BUCKET
# Paste: athlixir-82148.firebasestorage.app

vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
# Paste: 908727181890

vercel env add VITE_FIREBASE_APP_ID
# Paste: 1:908727181890:web:da8f703ed26d33c732c3db

vercel env add VITE_FIREBASE_MEASUREMENT_ID
# Paste: G-CK1BH0W08G

vercel env add VITE_ADMIN_EMAIL
# Paste: admin@athlixir.com

vercel env add VITE_ADMIN_PASSWORD
# Paste: Athlixir@123
```

For each, select:
- **Environment:** Production, Preview, Development (select all with space, then Enter)

### 4. **Deploy to Production**
```bash
vercel --prod
```

---

## 🔧 STEP 3: Configure Firebase for Production

After deployment, you'll get a URL like: `https://athlixir.vercel.app`

### Update Firebase Console:

1. **Go to:** [Firebase Console](https://console.firebase.google.com/project/athlixir-82148)
2. **Click:** Project Settings (gear icon)
3. **Scroll to:** "Your apps" → Select your Web App
4. **Add Authorized Domains:**
   - Click **"Add domain"**
   - Add: `athlixir.vercel.app` (your Vercel domain)
   - Add: `your-custom-domain.com` (if you have one)

5. **Firebase Authentication:**
   - Go to: Authentication → Settings → Authorized domains
   - Add your Vercel domain

---

## ✅ STEP 4: Test Your Deployment

### Test Routes (No more 404!):
1. Visit: `https://your-site.vercel.app/`
2. Navigate to: `https://your-site.vercel.app/athlete`
3. **Refresh the page** → ✅ Should work! (no 404)
4. Navigate to: `https://your-site.vercel.app/coach/dashboard`
5. **Refresh again** → ✅ Should work!

### Test Authentication:
1. Sign up as a new user
2. Login with credentials
3. Navigate between portals
4. Refresh on any page → Should stay on that page!

---

## 🎨 STEP 5: Custom Domain (Optional)

### Add Your Own Domain:

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **"Settings"** → **"Domains"**
   - Click **"Add"**
   - Enter your domain: `athlixir.com`

2. **Configure DNS:**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add these DNS records:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. **Wait for DNS propagation** (5-48 hours)

4. **Update Firebase:**
   - Add your custom domain to Firebase authorized domains

---

## 🔄 STEP 6: Auto-Deploy on Git Push

### Connect GitHub (if using Dashboard):
1. **In Vercel Dashboard:**
   - Your project → Settings → Git
   - Should already be connected

2. **Auto-Deploy:**
   - Every push to `main` branch → Auto-deploys! 🚀
   - Pull requests get preview deployments!

---

## 🐛 Troubleshooting

### Issue: 404 on refresh
**Solution:** Make sure `vercel.json` exists in root directory ✅

### Issue: Environment variables not working
**Solution:** 
1. Check all variables start with `VITE_`
2. Redeploy after adding env vars

### Issue: White screen / blank page
**Solution:**
1. Check browser console for errors
2. Verify Firebase config is correct
3. Check if Firestore is enabled

### Issue: Authentication not working
**Solution:**
1. Add Vercel domain to Firebase authorized domains
2. Check CORS settings in Firebase

---

## 📊 Monitor Your Deployment

### Vercel Dashboard:
- **Analytics:** See page views, performance
- **Logs:** View build and function logs
- **Deployments:** See all past deployments
- **Domains:** Manage custom domains

---

## 🎯 Quick Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment logs
vercel logs

# List all deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>
```

---

## 📝 Post-Deployment Checklist

After deployment, verify:

- [ ] Homepage loads correctly
- [ ] All routes work (no 404 on refresh)
- [ ] Authentication works (signup/login)
- [ ] All portals accessible (Athlete, Coach, User, Admin)
- [ ] Images and assets load
- [ ] Performance is good (check Lighthouse score)
- [ ] Mobile responsive
- [ ] Firebase connection works
- [ ] Environment variables loaded

---

## 🚀 You're Ready to Deploy!

**Recommended:** Use **STEP 2A** (Vercel Dashboard) - it's the easiest!

**Your deployment will be live in ~3 minutes!** 🎉

---

## 📞 Need Help?

- Vercel Docs: [https://vercel.com/docs](https://vercel.com/docs)
- Vercel Discord: Join for support
- Check deployment logs in Vercel dashboard
