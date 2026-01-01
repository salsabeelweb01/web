# Domain Migration Guide: salsabeel-re.ae

This guide will help you migrate your domain `salsabeel-re.ae` from your old website to the new Photo-Share application deployed on Render.

## Overview

Your domain `https://salsabeel-re.ae/` is currently pointing to your old website. We need to:
1. Deploy the new application to Render
2. Configure the domain to point to Render
3. Optionally migrate content from the old site

## Step 1: Deploy to Render (Free Tier)

### Option A: Using Render Dashboard (Recommended)

1. **Sign up for Render** (if you haven't):
   - Go to [render.com](https://render.com)
   - Sign up with GitHub (free tier available)

2. **Create a New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `Photo-Share` repository

3. **Configure the Service**:
   - **Name**: `salsabeel-real-estate`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Select "Free" (or "Starter" for better performance)

4. **Add PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `salsabeel-db`
   - Plan: Select "Free"
   - Note the connection details

5. **Set Environment Variables**:
   In your Web Service settings, add these environment variables:
   ```
   NODE_ENV=production
   PORT=10000
   ADMIN_PASSWORD=your-secure-password-here
   CUSTOM_DOMAIN=https://salsabeel-re.ae
   DATABASE_URL=<from PostgreSQL service - Internal Database URL>
   ```

6. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Wait for deployment to complete (5-10 minutes)

### Option B: Using render.yaml (Faster)

If you've pushed the `render.yaml` file to your repository:

1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect `render.yaml` and create services
5. Set the `ADMIN_PASSWORD` environment variable manually
6. Set `CUSTOM_DOMAIN=https://salsabeel-re.ae`

## Step 2: Run Database Migrations

After deployment, you need to set up the database:

1. **Open Render Shell**:
   - Go to your Web Service in Render
   - Click on "Shell" tab
   - Or use: `render.com` → Your Service → Shell

2. **Run Migrations**:
   ```bash
   npm run db:push
   ```

3. **Seed Database** (Optional - to add sample projects):
   ```bash
   npm run seed
   ```

## Step 3: Configure Custom Domain

### Get Your Render URL

After deployment, Render will give you a URL like:
- `https://salsabeel-real-estate.onrender.com`

### Configure DNS

You need to update your DNS records to point to Render. Here's how:

#### Option A: Using CNAME (Recommended)

1. **Get Render Hostname**:
   - In Render dashboard, go to your Web Service
   - Go to "Settings" → "Custom Domains"
   - Note the hostname (e.g., `salsabeel-real-estate.onrender.com`)

2. **Update DNS Records**:
   - Log into your domain registrar (where you bought salsabeel-re.ae)
   - Go to DNS management
   - Add/Update these records:

   **For root domain (salsabeel-re.ae)**:
   ```
   Type: CNAME
   Name: @ (or leave blank)
   Value: salsabeel-real-estate.onrender.com
   TTL: 3600
   ```

   **For www subdomain (www.salsabeel-re.ae)**:
   ```
   Type: CNAME
   Name: www
   Value: salsabeel-real-estate.onrender.com
   TTL: 3600
   ```

3. **Add Domain in Render**:
   - In Render dashboard → Your Web Service → Settings → Custom Domains
   - Click "Add Custom Domain"
   - Enter: `salsabeel-re.ae`
   - Enter: `www.salsabeel-re.ae`
   - Render will verify ownership

#### Option B: Using A Record (If CNAME not supported)

If your DNS provider doesn't support CNAME for root domain:

1. **Get Render IP Addresses**:
   - Contact Render support or check their documentation
   - Render provides static IPs for custom domains

2. **Update DNS**:
   ```
   Type: A
   Name: @
   Value: <Render IP address>
   TTL: 3600
   ```

### SSL Certificate

Render automatically provisions SSL certificates via Let's Encrypt. Once DNS propagates (can take up to 48 hours), HTTPS will be enabled automatically.

## Step 4: Verify Domain

1. **Check DNS Propagation**:
   - Use [whatsmydns.net](https://www.whatsmydns.net) to check if DNS has propagated
   - Enter `salsabeel-re.ae` and check CNAME/A records

2. **Test the Application**:
   - Visit `https://salsabeel-re.ae`
   - Check `/api/health` endpoint
   - Test all functionality

## Step 5: Migrate Content from Old Website

### Option A: Manual Migration

If your old website has content you want to keep:

1. **Export Data** (if possible):
   - Export projects, images, content from old site
   - Save images to `attached_assets/` folder

2. **Import via Admin Panel**:
   - Log into admin panel: `https://salsabeel-re.ae/admin`
   - Use the password you set in `ADMIN_PASSWORD`
   - Add projects manually through the admin interface

3. **Update Images**:
   - Upload images to `attached_assets/` folder
   - Update image paths in project data

### Option B: Database Migration

If you have access to the old database:

1. Export data from old database
2. Transform to match new schema
3. Import using database tools or scripts

### Option C: Keep Old Site Running (Temporary)

You can:
1. Point old site to a subdomain: `old.salsabeel-re.ae`
2. Set up redirects from old pages to new site
3. Gradually migrate content

## Step 6: Set Up Redirects (Optional)

If you want to redirect old URLs to new ones, add this to your Express server:

```typescript
// In server/routes.ts or server/index.ts
app.get('/old-page', (req, res) => {
  res.redirect(301, '/new-page');
});
```

## Troubleshooting

### Domain Not Working

1. **Check DNS Propagation**:
   - Wait 24-48 hours for DNS to fully propagate
   - Use DNS checker tools

2. **Verify Render Configuration**:
   - Ensure domain is added in Render dashboard
   - Check SSL certificate status

3. **Check DNS Records**:
   - Verify CNAME/A records are correct
   - Check TTL values

### Application Not Loading

1. **Check Render Logs**:
   - Go to Render dashboard → Your Service → Logs
   - Look for errors

2. **Verify Environment Variables**:
   - Check all required variables are set
   - Verify `DATABASE_URL` is correct

3. **Check Database Connection**:
   - Verify database is running
   - Test connection in Render Shell

### SSL Certificate Issues

1. **Wait for Propagation**:
   - SSL certificates are provisioned automatically
   - Can take up to 24 hours after DNS is correct

2. **Force SSL Provision**:
   - In Render dashboard, remove and re-add the domain
   - This triggers SSL certificate generation

## Important Notes

1. **Free Tier Limitations**:
   - Render free tier spins down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds
   - Consider upgrading to "Starter" plan ($7/month) for always-on

2. **Database Backups**:
   - Free tier databases are backed up daily
   - Consider upgrading for more frequent backups

3. **Domain Registrar**:
   - Keep your domain registered
   - DNS changes can take 24-48 hours to propagate globally

## Support

- **Render Support**: [render.com/docs](https://render.com/docs)
- **DNS Issues**: Contact your domain registrar
- **Application Issues**: Check Render logs and application code

## Next Steps After Migration

1. ✅ Test all functionality
2. ✅ Update Google Search Console with new sitemap
3. ✅ Set up monitoring/analytics
4. ✅ Update social media links
5. ✅ Notify users of new website
6. ✅ Set up email notifications for form submissions


