# Discord Bot Deployment Guide

## Prerequisites

- Docker installed on your server
- Docker Compose installed (optional but recommended)
- Your `.env` file with all necessary environment variables

## Quick Start with Docker Compose (Recommended)

1. **Make sure your `.env` file is in the project root:**
```bash
# .env file should contain:
CLIENT_KEY=your_discord_bot_token
CLIENT_ID=your_discord_application_id
GOOGLE_API_KEY=your_google_api_key
GOOGLE_SEARCH_ENGINE=your_search_engine_id
```

2. **Build and start the bot:**
```bash
docker-compose up -d
```

3. **View logs:**
```bash
docker-compose logs -f watibot
```

4. **Stop the bot:**
```bash
docker-compose down
```

5. **Restart the bot:**
```bash
docker-compose restart
```

6. **Update and redeploy:**
```bash
docker-compose down
docker-compose up -d --build
```

## Manual Docker Commands (Without Docker Compose)

1. **Build the image:**
```bash
docker build -t watibot .
```

2. **Run the container:**
```bash
docker run -d \
  --name watibot \
  --restart unless-stopped \
  --env-file .env \
  watibot
```

3. **View logs:**
```bash
docker logs -f watibot
```

4. **Stop the container:**
```bash
docker stop watibot
docker rm watibot
```

5. **Update and redeploy:**
```bash
docker stop watibot
docker rm watibot
docker build -t watibot .
docker run -d \
  --name watibot \
  --restart unless-stopped \
  --env-file .env \
  watibot
```

## Server Deployment Steps

### Option 1: Deploy from Git Repository

1. **SSH into your server:**
```bash
ssh user@your-server.com
```

2. **Clone your repository:**
```bash
git clone https://github.com/yourusername/watibot.git
cd watibot
```

3. **Create your `.env` file:**
```bash
nano .env
# Add your environment variables
```

4. **Start the bot:**
```bash
docker-compose up -d
```

### Option 2: Deploy with SCP

1. **From your local machine, copy files to server:**
```bash
scp -r ./* user@your-server.com:/path/to/watibot/
```

2. **SSH into your server:**
```bash
ssh user@your-server.com
cd /path/to/watibot
```

3. **Start the bot:**
```bash
docker-compose up -d
```

## Monitoring

### Check if bot is running:
```bash
docker ps | grep watibot
```

### View real-time logs:
```bash
docker-compose logs -f watibot
```

### Check resource usage:
```bash
docker stats watibot
```

## Troubleshooting

### Bot not starting:
```bash
# Check logs for errors
docker-compose logs watibot

# Verify environment variables
docker-compose exec watibot env | grep CLIENT
```

### Rebuild after code changes:
```bash
docker-compose down
docker-compose up -d --build
```

### Clear everything and start fresh:
```bash
docker-compose down
docker system prune -a
docker-compose up -d --build
```

## Automatic Updates with Watchtower (Optional)

To automatically update your bot when you push to Docker Hub:

```bash
docker run -d \
  --name watchtower \
  --restart unless-stopped \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --interval 300
```

## Security Notes

- ✅ Never commit your `.env` file to Git
- ✅ The Dockerfile runs as non-root user for security
- ✅ Use `--restart unless-stopped` to auto-restart on crashes
- ✅ Keep your Docker and Node.js versions updated

## Performance Tips

- The bot uses Alpine Linux for minimal image size (~150MB)
- Uses `npm ci --only=production` for faster, reproducible builds
- Restarts automatically on crashes with `restart: unless-stopped`