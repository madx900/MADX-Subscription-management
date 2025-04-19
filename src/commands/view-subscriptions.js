const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Subscription = require('../models/Subscription');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('view-subscriptions')
        .setDescription('View all active subscriptions')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to view subscriptions for (admin only)')
                .setRequired(false)),

    async execute(interaction) {
        try {
            const targetUser = interaction.options.getUser('user') || interaction.user;
            
            // If trying to view other user's subscriptions, check for admin permission
            if (targetUser.id !== interaction.user.id && 
                !interaction.member.permissions.has('ADMINISTRATOR')) {
                return interaction.reply({
                    content: '❌ You can only view your own subscriptions!',
                    ephemeral: true
                });
            }

            const subscriptions = await Subscription.find({ userId: targetUser.id });

            if (subscriptions.length === 0) {
                return interaction.reply({
                    content: `${targetUser.id === interaction.user.id ? 'You have' : 'This user has'} no active subscriptions.`,
                    ephemeral: true
                });
            }

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`${targetUser.username}'s Subscriptions`)
                .setTimestamp();

            subscriptions.forEach(sub => {
                const remainingTime = moment(sub.endDate).fromNow();
                embed.addFields({
                    name: `${sub.name} (ID: ${sub.subscriptionId})`,
                    value: `💰 Price: $${sub.price}\n⏱️ Expires: ${remainingTime}\n📅 End Date: ${sub.endDate.toLocaleDateString()}`
                });
            });

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '❌ There was an error while fetching the subscriptions.',
                ephemeral: true
            });
        }
    },
};
