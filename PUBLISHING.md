# Publishing the Aadhaar Harm Database v0.01

This guide walks through publishing the dataset and website to GitHub.

## 1. Create a new repository on GitHub

1. Go to https://github.com/new
2. Repository name: `aadhaar-harm-db`
3. Set to **Public** (recommended for open data)
4. Initialize with a README? **No** — we already have one
5. Create repository

## 2. Push the code

```bash
cd /root/.openclaw/workspace/aadhaar-harm-db

# Initialize git (if not already)
git init
git add .
git commit -m "Release v0.01 — initial dataset and website"

# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/aadhaar-harm-db.git

# Push
git branch -M main
git push -u origin main
```

## 3. Enable GitHub Pages

1. Go to repo Settings → Pages
2. Build and deployment source: **GitHub Actions**
3. The workflow `.github/workflows/pages.yml` will automatically deploy on push to main
4. After deployment, your site will be at: `https://YOUR-USERNAME.github.io/aadhaar-harm-db/`

## 4. Create a Release (v0.01)

```bash
# Tag the release
git tag -a v0.01 -m "First public release — 66 documented cases"
git push origin v0.01
```

Then on GitHub:
1. Go to Releases → Draft a new release
2. Choose tag `v0.01`
3. Fill title: "Aadhaar Harm Database v0.01"
4. Download assets: attach `aadhaar_harm_cases.json` and `.csv` (already in repo)
5. Publish release

## 5. (Optional) Set up Turso database

If you want to switch from local SQLite to Turso:

1. Sign up at https://turso.tech
2. Create a database (SQLite compatible)
3. Copy the `TURSO_URL` and `TURSO_AUTH_TOKEN`
4. In the skill environment, set these variables
5. Run `aadhaar_harm monitor --commit` to sync future findings

## 6. (Optional) Custom domain

In Settings → Pages → Custom domain:
- Enter your domain (e.g., `data.cashlessconsumer.org`)
- Add DNS record as instructed

## Done

Your dataset and website are now live. Share the GitHub repo and the Pages URL.

---

Questions? Open an issue: https://github.com/YOUR-USERNAME/aadhaar-harm-db/issues
