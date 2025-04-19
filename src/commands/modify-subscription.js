const { SlashCommandBuilder } = require('discord.js');
const Subscription = require('../models/Subscription');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modify-subscription')
        .setDescription('Modify an existing subscription')
        .addStringOption(option =>
            option.setName('subscription_id')
                .setDescription('The ID of the subscription to modify')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('New name for the subscription')
                .setRequired(false))
        .addNumberOption(option =>
            option.setName('price')
                .setDescription('New price for the subscription')
                .setRequired(false))
        .addNumberOption(option =>
            option.setName('duration')
                .setDescription('Additional days to add to the subscription')
                .setRequired(false))
        .addNumberOption(option =>
            option.setName('notify_days')
                .setDescription('Days before expiry to notify')
                .setRequired(false)),

    async execute(interaction) {
        try {
            const subscriptionId = interaction.options.getString('subscription_id');
            const subscription = await Subscription.findOne({ subscriptionId });

            if (!subscription) {
                return interaction.reply({
                    content: '❌ Subscription not found.',
                    ephemeral: true
                });
            }

            // Check if user has permission to modify this subscription
            if (subscription.userId !== interaction.user.id && 
                !interaction.member.permissions.has('ADMINISTRATOR')) {
                return interaction.reply({
                    content: '❌ You can only modify your own subscriptions!',
                    ephemeral: true
                });
            }

            // Update subscription details
            const updates = {};
            const newName = interaction.options.getString('name');
            const newPrice = interaction.options.getNumber('price');
            const additionalDays = interaction.options.getNumber('duration');
            const newNotifyDays = interaction.options.getNumber('notify_days');

            if (newName) updates.name = newName;
            if (newPrice) updates.price = newPrice;
            if (additionalDays) {
                const newEndDate = new Date(subscription.endDate);
                newEndDate.setDate(newEndDate.getDate() + additionalDays);
                updates.endDate = newEndDate;
                updates.duration = subscription.duration + additionalDays;
            }
            if (newNotifyDays) updates.notifyDays = newNotifyDays;

            if (Object.keys(updates).length === 0) {
                return interaction.reply({
                    content: '❌ No changes specified.',
                    ephemeral: true
                });
            }

            // Reset notification flag if duration was extended
            if (additionalDays) {
                updates.notificationSent = false;
            }

            await Subscription.updateOne({ subscriptionId }, { $set: updates });

            const updatedSubscription = await Subscription.findOne({ subscriptionId });
            await interaction.reply({
                content: `✅ Subscription updated successfully!\n- Name: ${updatedSubscription.name}\n- Price: $${updatedSubscription.price}\n- Expires: ${updatedSubscription.endDate.toLocaleDateString()}\n- Notify Days: ${updatedSubscription.notifyDays}`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '❌ There was an error while modifying the subscription.',
                ephemeral: true
            });
        }
    },
};
