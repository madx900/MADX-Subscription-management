const { Events } = require('discord.js');
const { checkExpiredSubscriptions } = require('../utils/subscriptionChecker');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        
        // Start checking for expired subscriptions every hour
        setInterval(() => {
            checkExpiredSubscriptions(client);
        }, 3600000); // 1 hour
    },
};
