# ⚡ Quick Start: Deploy with Supabase

The fastest way to deploy your app using Supabase for the database.

## Why Supabase?

- ✅ Better free tier than Render's database
- ✅ 500MB storage (vs 90 days only on Render)
- ✅ Excellent database UI
- ✅ Automatic backups
- ✅ Better performance

## 5-Minute Setup

### 1. Create Supabase Database (2 min)

1. Go to [supabase.com](https://supabase.com) → Sign up
2. Click "New Project"
3. Fill in:
   - Name: `salsabeel-real-estate`
   - Password: (save this!)
   - Region: Singapore (closest to UAE)
4. Wait 2 minutes for setup

### 2. Get Connection String (1 min)

1. In Supabase Dashboard → **Settings** → **Database**
2. Scroll to **Connection String**
3. Copy **Connection Pooler** URI
4. Replace `[YOUR-PASSWORD]` with your password
5. Save it! (Looks like: `postgresql://postgres.xxx:password@aws-0-xxx.pooler.supabase.com:6543/postgres`)

### 3. Deploy to Railway (2 min)

1. Go to [railway.app](https://railway.app) → Sign up
2. "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add these environment variables:
   ```
   DATABASE_URL = <paste Supabase connection string>
   NODE_ENV = production
   PORT = 5000
   ADMIN_PASSWORD = <your-password>
   CUSTOM_DOMAIN = https://salsabeel-re.ae
   ```
5. Railway auto-deploys! ✨

### 4. Set Up Database (1 min)

1. In Railway dashboard → Your service → "..." → "Open Shell"
2. Run:
   ```bash
   npm run db:push
   npm run seed
   ```

### 5. Add Domain

1. Railway → Settings → Domains → Add `salsabeel-re.ae`
2. Update DNS at your registrar (CNAME to Railway URL)
3. Wait 24-48 hours

## That's It! 🎉

Your app is now live with:
- ✅ Supabase database (better than Render's free tier)
- ✅ Railway hosting (always-on free tier available)
- ✅ Your custom domain `salsabeel-re.ae`

## Cost

- **Supabase**: FREE (500MB database)
- **Railway**: FREE (or $5/month for always-on)
- **Total**: $0-5/month (vs $14/month with Render database)

---

**Need more details?** See `SUPABASE_DEPLOY.md` for complete guide.

