# 🔓 Petition To Unleash Noah Kerr

A fun petition website with a faux "live" signature counter and highest bidder leaderboard.

## Features

- **Giant Header**: Bold "PETITION TO UNLEASH NOAH KERR" with animated glowing gradient text
- **Live Signature Counter**: Starts at 4,322 and increments randomly every few seconds with a bounce animation
- **Signature Collection**: Users can enter their name to "sign" the petition
- **Bidding System**: Users can place bids to support the cause
- **Leaderboard**: Shows highest bidders, sorted by amount

### Hardcoded Bidders (sorted by bid):
1. **Fogarty** - $22,000 (highest)
2. **SinRalt** - $21,999 (second highest)
3. **Mrs. Kerr** - $25 (middle)
4. **Ben Hill** - $1 (second lowest)
5. **Notaso** - $0.01 (lowest)

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Railway

### Option 1: Via Railway Dashboard
1. Go to [railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub and select this repository
4. Railway will auto-detect Next.js and deploy

### Option 2: Via Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Environment Variables (optional)
No environment variables required for basic functionality.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React

## Project Structure

```
unleash-noah/
├── app/
│   ├── globals.css    # Styles with animations
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Main petition page
├── railway.json       # Railway deployment config
└── package.json
```

---

**FREE NOAH KERR 2025** 🔓
