# MADX Subscription Management Bot

A powerful Discord bot for managing user subscriptions with automated notifications and comprehensive subscription tracking.

![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

- **Subscription Management**
  - Add subscriptions with custom names, prices, and durations
  - Generate unique IDs for each subscription
  - Support unlimited subscriptions per user
  - Modify existing subscriptions on the fly

- **Automated Notifications**
  - Configurable notification timing
  - Automatic expiry notifications
  - Custom notification messages
  - User-friendly reminder system

- **User Interface**
  - Intuitive slash commands
  - Clean and informative embeds
  - Easy-to-use subscription viewer
  - Detailed subscription information

## 🚀 Getting Started

### Prerequisites

- Node.js 16.9.0 or higher
- MongoDB database
- Discord Bot Token
- Discord Application with slash commands enabled

### Installation

1. Clone the repository
```bash
git clone https://github.com/madx900/MADX-Subscription-management.git
cd MADX-Subscription-management
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_client_id_here
MONGODB_URI=your_mongodb_uri_here
```

4. Register slash commands
```bash
node src/deploy-commands.js
```

5. Start the bot
```bash
npm start
```

## 💻 Usage

### Available Commands

- `/add-subscription` - Add a new subscription
  - Options: user, name, price, duration, notify_days

- `/view-subscriptions` - View all active subscriptions
  - Options: user (admin only)

- `/modify-subscription` - Modify an existing subscription
  - Options: subscription_id, name, price, duration, notify_days

### Examples

```
/add-subscription user:@username name:Premium price:29.99 duration:30
/view-subscriptions
/modify-subscription subscription_id:abc123 duration:60
```

## 🔧 Configuration

The bot can be configured through environment variables:

- `DISCORD_TOKEN` - Your Discord bot token
- `CLIENT_ID` - Your Discord application client ID
- `MONGODB_URI` - MongoDB connection string
- `DEFAULT_NOTIFY_DAYS` - Default notification days before expiry (optional)

## 🤝 Support

Join our Discord server for support and updates: [Discord Server](https://discord.gg/yKQaBYpGuh)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**MADX**
- GitHub: [@madx900](https://github.com/madx900)
- Discord: [Support Server](https://discord.gg/yKQaBYpGuh)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!
