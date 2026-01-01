# 🚀 Quick Deploy - Step by Step

Follow these steps to deploy your app to the cloud (FREE on Render).

## Step 1: Prepare Your Code (5 minutes)

### 1.1 Commit Your Changes

```bash
cd /Users/mustafaalqaseer/Downloads/Photo-Share
git add .
git commit -m "Ready for deployment"
```

### 1.2 Push to GitHub

**Option A: Create New GitHub Repository**

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `salsabeel-real-estate` (or any name)
3. **DO NOT** initialize with README
4. Copy the repository URL

Then run:
```bash
git remote add github https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u github main
```

**Option B: Use Existing Repository**

If you already have a GitHub repo:
```bash
git remote add github https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u github main
```

## Step 2: Sign Up for Render (2 minutes)

1. Go to **[render.com](https://render.com)**
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account** (easiest way)
4. Authorize Render to access your repositories

## Step 3: Create Database (3 minutes)

1. In Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Fill in:
   - **Name**: `salsabeel-db`
   - **Database**: `photoshare`
   - **User**: `photoshare`
   - **Plan**: **Free** (or Starter $7/month for always-on)
3. Click **"Create Database"**
4. ⚠️ **IMPORTANT**: Copy the **"Internal Database URL"** (you'll need it in Step 4)

It looks like: `postgresql://photoshare:xxxxx@dpg-xxxxx-a.oregon-postgres.render.com/photoshare`

## Step 4: Deploy Web Service (5 minutes)

1. In Render Dashboard, click **"New +"** → **"Web Service"**

2. Connect your repository:
   - If not connected, click "Connect GitHub" and authorize
   - Find and select your `Photo-Share` repository
   - Click **"Connect"**

3. Configure the service:
   - **Name**: `salsabeel-real-estate`
   - **Environment**: `Node`
   - **Region**: Choose closest to UAE (Singapore is good)
   - **Branch**: `main`
   - **Root Directory**: (leave blank)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: **Free** (spins down after inactivity) or **Starter $7/month** (always on)

4. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):

   Add these one by one:
   
   ```
   NODE_ENV = production
   ```
   
   ```
   PORT = 10000
   ```
   
   ```
   DATABASE_URL = <paste the Internal Database URL from Step 3>
   ```
   
   ```
   ADMIN_PASSWORD = <choose a strong password>
   ```
   
   ```
   CUSTOM_DOMAIN = https://salsabeel-re.ae
   ```

5. Click **"Create Web Service"**

6. **Wait for deployment** (5-10 minutes)
   - Watch the build logs
   - Wait for "Your service is live" message
   - Note the Render URL: `https://salsabeel-real-estate.onrender.com`

## Step 5: Set Up Database (2 minutes)

After deployment completes:

1. In your Web Service page, click the **"Shell"** tab
2. Run these commands:

```bash
npm run db:push
npm run seed
```

This creates the database tables and adds sample data.

## Step 6: Connect Your Domain (10 minutes)

### 6.1 Add Domain in Render

1. Go to your Web Service → **"Settings"** tab
2. Scroll to **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter: `salsabeel-re.ae`
5. Click **"Save"**
6. Also add: `www.salsabeel-re.ae`

### 6.2 Update DNS at Your Registrar

Go to where you manage your domain (e.g., GoDaddy, Namecheap, etc.):

**For root domain (salsabeel-re.ae)**:

```
Type: CNAME
Name: @ (or leave blank, or use "root")
Value: salsabeel-real-estate.onrender.com
TTL: 3600 (or default)
```

**For www subdomain**:

```
Type: CNAME
Name: www
Value: salsabeel-real-estate.onrender.com
TTL: 3600
```

**Note**: If your registrar doesn't support CNAME for root domain (@), you'll need to use A records. Contact Render support for IP addresses, or check Render documentation.

### 6.3 Wait for DNS Propagation

- Can take **24-48 hours** (usually much faster)
- Check status: [whatsmydns.net](https://www.whatsmydns.net) - enter `salsabeel-re.ae`
- Render will automatically provision SSL certificate once DNS is correct

## Step 7: Verify Everything Works

1. **Test Render URL** (works immediately):
   - Visit: `https://salsabeel-real-estate.onrender.com`
   - Should see your application

2. **Test Custom Domain** (after DNS propagates):
   - Visit: `https://salsabeel-re.ae`
   - Should see your application with SSL

3. **Test Admin Panel**:
   - Visit: `https://salsabeel-re.ae/admin`
   - Login with your `ADMIN_PASSWORD`

4. **Test API**:
   - Visit: `https://salsabeel-re.ae/api/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

## ✅ You're Done!

Your application is now live in the cloud!

## 💰 Cost Summary

**FREE Option**:
- Web Service: FREE (spins down after 15 min inactivity)
- Database: FREE (for 90 days, then $7/month)
- Domain: FREE
- SSL: FREE

**Recommended (Always On)**:
- Web Service: $7/month (Starter plan)
- Database: $7/month
- **Total: ~$14/month**

## 🆘 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify all files are committed and pushed to GitHub

### Database Connection Error
- Verify `DATABASE_URL` uses **Internal Database URL** (not External)
- Check database is running in Render dashboard

### Domain Not Working
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct at your registrar
- Check domain is added in Render dashboard

### Application Spins Down (Free Tier)
- This is normal - free tier spins down after 15 min
- First request takes ~30 seconds to wake up
- Upgrade to Starter ($7/month) for always-on

## 📞 Need Help?

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Render Support**: Available in dashboard
- **Check Logs**: Render Dashboard → Your Service → Logs

---

**🎉 Congratulations! Your app is now in the cloud!**

