const Subscription = require('../models/Subscription');
const { EmbedBuilder } = require('discord.js');

async function checkExpiredSubscriptions(client) {
    try {
        const now = new Date();
        
        // Find subscriptions that need notification
        const subscriptionsToNotify = await Subscription.find({
            endDate: { 
                $gt: now,
                $lte: new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)) // 3 days from now
            },
            notificationSent: false
        });

        // Send notifications
        for (const subscription of subscriptionsToNotify) {
            const user = await client.users.fetch(subscription.userId);
            if (user) {
                const embed = new EmbedBuilder()
                    .setColor('#YELLOW')
                    .setTitle('⚠️ Subscription Expiring Soon')
                    .setDescription(`Your subscription for **${subscription.name}** is expiring soon!`)
                    .addFields(
                        { name: 'Subscription ID', value: subscription.subscriptionId },
                        { name: 'Expires On', value: subscription.endDate.toLocaleDateString() },
                        { name: 'Price', value: `$${subscription.price}` }
                    )
                    .setTimestamp();

                await user.send({ embeds: [embed] });
                subscription.notificationSent = true;
                await subscription.save();
            }
        }

        // Find expired subscriptions
        const expiredSubscriptions = await Subscription.find({
            endDate: { $lte: now }
        });

        // Handle expired subscriptions
        for (const subscription of expiredSubscriptions) {
            const user = await client.users.fetch(subscription.userId);
            if (user) {
                const embed = new EmbedBuilder()
                    .setColor('#RED')
                    .setTitle('🔴 Subscription Expired')
                    .setDescription(`Your subscription for **${subscription.name}** has expired!`)
                    .addFields(
                        { name: 'Subscription ID', value: subscription.subscriptionId },
                        { name: 'Expired On', value: subscription.endDate.toLocaleDateString() },
                        { name: 'Price', value: `$${subscription.price}` }
                    )
                    .setTimestamp();

                await user.send({ embeds: [embed] });
            }
            await Subscription.deleteOne({ _id: subscription._id });
        }
    } catch (error) {
        console.error('Error checking subscriptions:', error);
    }
}

module.exports = { checkExpiredSubscriptions };
