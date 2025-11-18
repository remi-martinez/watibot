# watibot

[![DiscordJS](https://img.shields.io/badge/Discord.JS-333.svg?logo=discord&style=for-the-badge&logoColor=5865F2)](https://discord.js.org/)

> A simple Discord bot that fetches and displays images from a custom Google engine endpoint.  
> Made with DiscordJS v14


Usage
---
* Add the bot to your server
* Send "`/wati <search>`" in any channel
* The bot writes a funny sentence and send and image related to your query!   
![image](https://github.com/remi-martinez/watibot/assets/64494563/a962a179-ace6-4083-b628-6dfe7e636e98)

Run locally
---

1. Clone project
2. `npm install`
3. Add a `.env` file containing the required variables :
    - CLIENT_ID : Your Discord Application id found on the [dev portal](https://discord.com/developers/applications/)
    - CLIENT_KEY : Your Discord Application BOT client secret found on the [dev portal](https://discord.com/developers/applications/)
    - GOOGLE_API_KEY : A custom Google Search Engine API Key generated [here](https://programmablesearchengine.google.com/controlpanel/all)
    - GOOGLE_SEARCH_ENGINE : A custom Google Search Engine public ID generated [here](https://programmablesearchengine.google.com/controlpanel/all)
4. `npm run start`

Deployment
---

For further information, check [DEPLOYMENT.md](DEPLOYMENT.md)
