#!/bin/bash
# Quick deployment script - Run this to prepare for deployment

echo "🚀 Preparing your code for deployment..."
echo ""

cd /Users/mustafaalqaseer/Downloads/Photo-Share

# Commit all changes
echo "📝 Committing current changes..."
git add .
git commit -m "Ready for deployment to Render" || echo "No changes to commit or already committed"

echo ""
echo "✅ Code is ready!"
echo ""
echo "Next steps:"
echo "1. Create a GitHub repository (if you haven't already)"
echo "2. Push your code: git remote add origin <your-github-repo-url> && git push -u origin main"
echo "3. Follow the steps in DEPLOY_NOW.md to deploy to Render"
echo ""
echo "Or run this command to add GitHub remote:"
echo "   git remote add github https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git push -u github main"

