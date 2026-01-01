# Deployment Checklist

Use this checklist to ensure your application is ready for production deployment.

## Pre-Deployment

- [ ] **Environment Variables Set**
  - [ ] `DATABASE_URL` - PostgreSQL connection string
  - [ ] `NODE_ENV=production`
  - [ ] `ADMIN_PASSWORD` - Strong password set
  - [ ] `PORT` - Set if required by platform (most auto-detect)

- [ ] **Database Setup**
  - [ ] PostgreSQL database provisioned
  - [ ] Database migrations run (`npm run db:push`)
  - [ ] Database seeded (optional, `npm run seed`)

- [ ] **Build Verification**
  - [ ] `npm run build` completes successfully
  - [ ] `dist/` folder contains:
    - [ ] `dist/index.cjs` (server)
    - [ ] `dist/public/` (client assets)

- [ ] **Static Assets**
  - [ ] `attached_assets/` folder exists
  - [ ] All project images are in place
  - [ ] Image paths in database match actual files

- [ ] **Security**
  - [ ] Admin password changed from default
  - [ ] Database credentials are secure
  - [ ] `.env` file is in `.gitignore`
  - [ ] No sensitive data in code

## Platform-Specific

### Railway
- [ ] Project connected to GitHub
- [ ] PostgreSQL addon added
- [ ] Environment variables configured
- [ ] Build command: `npm run build` (auto-detected)
- [ ] Start command: `npm start` (auto-detected from Procfile)

### Heroku
- [ ] Heroku CLI installed
- [ ] App created
- [ ] PostgreSQL addon added
- [ ] Environment variables set
- [ ] Procfile present (✓ already added)

### Render
- [ ] Web service created
- [ ] PostgreSQL database created
- [ ] Build command: `npm run build`
- [ ] Start command: `npm start`
- [ ] Environment variables set

### VPS/Server
- [ ] Server provisioned
- [ ] Node.js 18+ installed
- [ ] PostgreSQL installed and running
- [ ] Nginx configured (if using)
- [ ] PM2 installed (if using)
- [ ] Firewall configured
- [ ] SSL certificate installed (Let's Encrypt)

## Post-Deployment

- [ ] **Health Check**
  - [ ] Visit `/api/health` - should return `{"status":"ok"}`
  - [ ] Verify application loads at root URL

- [ ] **Functionality Tests**
  - [ ] Homepage loads
  - [ ] Projects list displays
  - [ ] Project details page works
  - [ ] Contact form submits
  - [ ] Viewing request form submits
  - [ ] Admin login works
  - [ ] Admin can create projects
  - [ ] Admin can delete projects

- [ ] **Performance**
  - [ ] Images load correctly
  - [ ] API responses are fast
  - [ ] No console errors

- [ ] **Monitoring**
  - [ ] Error logging configured
  - [ ] Uptime monitoring set up (optional)
  - [ ] Database backups configured (platform-dependent)

## Troubleshooting

### Application won't start
1. Check environment variables are set
2. Verify database connection
3. Check build completed successfully
4. Review application logs

### Images not loading
1. Verify `attached_assets` folder is deployed
2. Check image paths in database
3. Verify static file serving is working
4. Check file permissions

### Database errors
1. Verify `DATABASE_URL` is correct
2. Run migrations: `npm run db:push`
3. Check database is accessible
4. Verify schema matches code

### 500 errors
1. Check application logs
2. Verify all environment variables
3. Check database connection
4. Review error messages in logs

## Quick Deploy Commands

### Railway
```bash
railway login
railway init
railway up
railway run npm run db:push
railway run npm run seed  # optional
```

### Heroku
```bash
heroku login
heroku create your-app-name
heroku addons:create heroku-postgresql:mini
git push heroku main
heroku run npm run db:push
heroku run npm run seed  # optional
```

### Render
1. Connect GitHub repo in Render dashboard
2. Set build/start commands
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

## Maintenance

- [ ] Regular database backups
- [ ] Monitor application logs
- [ ] Update dependencies regularly
- [ ] Review security updates
- [ ] Monitor database size


