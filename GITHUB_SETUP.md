# GitHub Setup Guide

## Quick Setup (5 minutes)

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `workspace-hub`
3. Description: "Customizable web app launcher for quick access to tools and resources"
4. Set to **Public** (required for free GitHub Pages)
5. Don't initialize with README (we have one)
6. Click "Create repository"

### 2. Upload Files
Two options:

#### Option A: Upload via GitHub Web Interface (Easiest)
1. Click "uploading an existing file"
2. Drag and drop these files:
   - `index.html`
   - `data.json`
   - `README.md`
   - `CHANGELOG.md`
   - `.gitignore`
3. Commit message: "Initial commit"
4. Click "Commit changes"

#### Option B: Upload via Git Command Line
```bash
# In your local directory with the files
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/workspace-hub.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to repository Settings
2. Click "Pages" in left sidebar
3. Under "Source", select "Deploy from a branch"
4. Branch: `main`, Folder: `/ (root)`
5. Click "Save"
6. Wait 1-2 minutes for deployment
7. Your site will be at: `https://YOUR-USERNAME.github.io/workspace-hub/`

### 4. Customize Your Data
1. Edit `data.json` on GitHub (click the file → Edit button)
2. Update links and policies with your actual URLs
3. Commit changes
4. Changes go live in ~1 minute

## Making Updates

### Edit Links
1. Go to your repo on GitHub
2. Click `data.json`
3. Click pencil icon (Edit)
4. Make changes
5. Scroll down → "Commit changes"

### Add New Features
1. Edit `index.html` or create new files
2. Update `CHANGELOG.md` with changes
3. Commit

### Accept User Submissions
When users export their custom links:
1. They send you the JSON file
2. Review the links they added
3. Copy good ones into `data.json`
4. Set `"isNew": true` on new links
5. Commit and push

## Versioning

Update version numbers in:
- `CHANGELOG.md` - Add new version section
- `index.html` - Update the changelog tab content
- Tag the commit: `git tag v1.1.0` and `git push --tags`

## Custom Domain (Optional)

Want to use `hub.company.com` instead of GitHub Pages URL?

1. Add a `CNAME` file to your repo with your domain:
   ```
   hub.company.com
   ```
2. In your DNS settings, add a CNAME record:
   - Name: `hub`
   - Value: `YOUR-USERNAME.github.io`
3. In GitHub repo Settings → Pages → Custom domain: `hub.company.com`
4. Enable "Enforce HTTPS"

## Tips

### Keep Your Repo Private (Requires GitHub Pro)
If you have GitHub Pro/Team/Enterprise:
- You can make the repo private
- GitHub Pages still works
- Only authenticated users can see the repo code
- But the live site is still public unless you add authentication

### Branches for Testing
Create a `dev` branch for testing:
```bash
git checkout -b dev
# Make changes
git push origin dev
```
Deploy `dev` branch to test at a different URL before merging to `main`.

### Auto-Deploy
GitHub Pages auto-deploys when you push to `main`. No extra setup needed!

### Backup
GitHub IS your backup. Clone locally occasionally:
```bash
git clone https://github.com/YOUR-USERNAME/workspace-hub.git
```

## Sharing with Others

### Public Template
Others can click "Use this template" on your repo to create their own copy.

### Fork
Others can fork and customize for their organization.

### License
The MIT license in the repo allows anyone to use and modify freely.

## Troubleshooting

**Site not loading?**
- Wait 2-3 minutes after enabling Pages
- Check Settings → Pages shows a green success message
- Clear browser cache

**Changes not showing?**
- Wait 1-2 minutes for deployment
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**404 error?**
- Ensure GitHub Pages is enabled
- Check the file is named `index.html` (not `workspace-hub.html`)
- Verify the URL matches: `https://USERNAME.github.io/REPO-NAME/`

## Next Steps

1. ⭐ Star your own repo
2. Add topics: `webapp`, `launcher`, `dashboard`, `productivity`
3. Add a screenshot to README
4. Share the URL with your team
5. Watch for user feedback via GitHub Issues
