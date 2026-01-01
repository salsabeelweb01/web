# Photo-Share - Real Estate Web Application

A modern, full-stack real estate web application built with React, Express, and PostgreSQL. Showcase properties, manage inquiries, and handle viewing requests with a beautiful, responsive UI.

## 🚀 Quick Deploy

**Recommended: Supabase Database + Railway**  
👉 See [SUPABASE_QUICKSTART.md](./SUPABASE_QUICKSTART.md) for the fastest deployment (better free tier!)

**Alternative: Render**  
👉 See [DEPLOY_NOW.md](./DEPLOY_NOW.md) for step-by-step instructions to deploy to Render (FREE).

**Migrating from old website?** See [DOMAIN_MIGRATION.md](./DOMAIN_MIGRATION.md) for detailed domain migration guide.

## Features

- 🏠 **Property Listings**: Browse and filter properties by location, type, and status
- 📸 **Image Galleries**: Beautiful image carousels for each property
- 📧 **Contact Forms**: Submit inquiries and viewing requests
- 🔐 **Admin Panel**: Manage properties and view submissions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Fast Performance**: Optimized builds and efficient database queries

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI, shadcn/ui

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud-hosted)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Photo-Share
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/photoshare

# Server Configuration
PORT=5000

# Node Environment
NODE_ENV=development

# Admin Password
ADMIN_PASSWORD=your-secure-password-here
```

### 4. Set Up the Database

#### Option A: Using Drizzle Kit (Recommended)

```bash
# Push schema to database
npm run db:push
```

#### Option B: Manual Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE photoshare;
```

2. The schema will be automatically created when you run the application.

### 5. Seed the Database (Optional)

To populate the database with sample data:

```bash
npm run seed
```

### 6. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Building for Production

### 1. Build the Application

```bash
npm run build
```

This will:
- Build the React frontend to `dist/public`
- Bundle the Express server to `dist/index.cjs`

### 2. Start the Production Server

```bash
npm start
```

## Deployment

### Railway

1. **Create a Railway Account**: Sign up at [railway.app](https://railway.app)

2. **Create a New Project**: Click "New Project" → "Deploy from GitHub repo"

3. **Add PostgreSQL**: In your project, click "New" → "Database" → "Add PostgreSQL"

4. **Set Environment Variables**:
   - `DATABASE_URL`: Automatically set by Railway when you add PostgreSQL
   - `NODE_ENV`: `production`
   - `ADMIN_PASSWORD`: Your secure admin password
   - `PORT`: Railway sets this automatically

5. **Deploy**: Railway will automatically detect your `Procfile` and deploy

6. **Run Migrations**: After first deployment, run:
   ```bash
   railway run npm run db:push
   ```

7. **Seed Database** (Optional):
   ```bash
   railway run npm run seed
   ```

### Heroku

1. **Install Heroku CLI**: [Get it here](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login**:
   ```bash
   heroku login
   ```

3. **Create App**:
   ```bash
   heroku create your-app-name
   ```

4. **Add PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

5. **Set Environment Variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set ADMIN_PASSWORD=your-secure-password
   ```

6. **Deploy**:
   ```bash
   git push heroku main
   ```

7. **Run Migrations**:
   ```bash
   heroku run npm run db:push
   ```

8. **Seed Database** (Optional):
   ```bash
   heroku run npm run seed
   ```

### Render

1. **Create a Render Account**: Sign up at [render.com](https://render.com)

2. **Create New Web Service**: Connect your GitHub repository

3. **Configure**:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

4. **Add PostgreSQL Database**: Create a new PostgreSQL database in Render

5. **Set Environment Variables**:
   - `DATABASE_URL`: From your PostgreSQL database
   - `NODE_ENV`: `production`
   - `ADMIN_PASSWORD`: Your secure admin password

6. **Deploy**: Render will automatically deploy on push

7. **Run Migrations**: After deployment, use the Render shell:
   ```bash
   npm run db:push
   ```

### Docker Deployment

1. **Build the Docker Image**:
   ```bash
   docker build -t photoshare .
   ```

2. **Run the Container**:
   ```bash
   docker run -d \
     -p 5000:5000 \
     -e DATABASE_URL=postgresql://user:password@host:5432/database \
     -e NODE_ENV=production \
     -e ADMIN_PASSWORD=your-secure-password \
     --name photoshare \
     photoshare
   ```

3. **With Docker Compose** (create `docker-compose.yml`):
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "5000:5000"
       environment:
         - DATABASE_URL=postgresql://postgres:password@db:5432/photoshare
         - NODE_ENV=production
         - ADMIN_PASSWORD=your-secure-password
       depends_on:
         - db
     
     db:
       image: postgres:15-alpine
       environment:
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=password
         - POSTGRES_DB=photoshare
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   ```

   Then run:
   ```bash
   docker-compose up -d
   docker-compose exec app npm run db:push
   docker-compose exec app npm run seed  # optional
   ```

### VPS/Server Deployment

1. **Set Up Server**: Ubuntu/Debian recommended

2. **Install Dependencies**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt-get install postgresql postgresql-contrib
   ```

3. **Clone and Build**:
   ```bash
   git clone <your-repo-url>
   cd Photo-Share
   npm install
   npm run build
   ```

4. **Set Up Environment Variables**: Create `.env` file

5. **Set Up Database**: Create PostgreSQL database and run migrations

6. **Use PM2** (Process Manager):
   ```bash
   npm install -g pm2
   pm2 start dist/index.cjs --name photoshare
   pm2 save
   pm2 startup
   ```

7. **Set Up Nginx** (Reverse Proxy):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `ADMIN_PASSWORD` | Password for admin panel | No | admin123 |

## Project Structure

```
Photo-Share/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utilities and API client
│   └── index.html
├── server/              # Express backend
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── db.ts            # Database connection
│   ├── storage.ts        # Database operations
│   └── static.ts        # Static file serving
├── shared/              # Shared types and schemas
│   └── schema.ts        # Database schema
├── attached_assets/     # Static assets (images)
├── script/              # Build scripts
└── dist/                # Production build output
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/projects` - Get all projects (with optional filters)
- `GET /api/projects/:id` - Get project by ID
- `GET /api/locations` - Get unique locations
- `POST /api/contact` - Submit contact inquiry
- `POST /api/viewing-requests` - Submit viewing request
- `POST /api/admin/verify` - Verify admin password
- `POST /api/projects` - Create project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

## Security Considerations

1. **Change Admin Password**: Always set a strong `ADMIN_PASSWORD` in production
2. **Database Security**: Use strong database credentials and restrict access
3. **HTTPS**: Use HTTPS in production (most platforms provide this automatically)
4. **Environment Variables**: Never commit `.env` files to version control
5. **CORS**: Adjust CORS settings in `server/index.ts` for your domain

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check firewall settings
- Verify database credentials

### Build Errors

- Clear `node_modules` and `dist` folders
- Run `npm install` again
- Check Node.js version (18+ required)

### Static Files Not Loading

- Ensure `attached_assets` folder exists
- Check file permissions
- Verify paths in project data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

