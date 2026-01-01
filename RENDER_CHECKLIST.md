# ✅ Render Deployment Checklist

Use this checklist to track your deployment progress.

## Pre-Deployment

- [ ] Code committed to Git
- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] GitHub connected to Render

## Database Setup

- [ ] PostgreSQL database created in Render
- [ ] Database name: `photoshare`
- [ ] Internal Database URL copied

## Web Service Setup

- [ ] Web Service created
- [ ] Repository connected
- [ ] Environment variables set:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000`
  - [ ] `DATABASE_URL=<from database>`
  - [ ] `ADMIN_PASSWORD=<your password>`
  - [ ] `CUSTOM_DOMAIN=https://salsabeel-re.ae`
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Deployment completed successfully

## Database Initialization

- [ ] Opened Render Shell
- [ ] Ran `npm run db:push` (created tables)
- [ ] Ran `npm run seed` (added sample data)

## Domain Setup

- [ ] Domain `salsabeel-re.ae` added in Render
- [ ] Domain `www.salsabeel-re.ae` added in Render
- [ ] DNS records updated at registrar:
  - [ ] CNAME for `@` → Render URL
  - [ ] CNAME for `www` → Render URL
- [ ] DNS propagation checked (24-48 hours)

## Testing

- [ ] Render URL works: `https://salsabeel-real-estate.onrender.com`
- [ ] Custom domain works: `https://salsabeel-re.ae`
- [ ] SSL certificate active (green lock)
- [ ] Homepage loads correctly
- [ ] Projects page displays
- [ ] Project details work
- [ ] Contact form submits
- [ ] Admin panel accessible
- [ ] Admin login works
- [ ] API health check: `/api/health`

## Post-Deployment

- [ ] Admin password saved securely
- [ ] Database credentials saved
- [ ] Monitoring set up (optional)
- [ ] Google Analytics added (optional)
- [ ] Sitemap submitted (optional)

---

**Deployment Date**: _______________  
**Render URL**: https://salsabeel-real-estate.onrender.com  
**Custom Domain**: https://salsabeel-re.ae  
**Admin Password**: _______________
