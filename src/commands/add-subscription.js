const { SlashCommandBuilder } = require('discord.js');
const Subscription = require('../models/Subscription');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-subscription')
        .setDescription('Add a new subscription for a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to add the subscription for')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the subscription')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('price')
                .setDescription('Price of the subscription')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('duration')
                .setDescription('Duration in days')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('notify_days')
                .setDescription('Days before expiry to notify (default: 3)')
                .setRequired(false)),

    async execute(interaction) {
        try {
            const user = interaction.options.getUser('user');
            const name = interaction.options.getString('name');
            const price = interaction.options.getNumber('price');
            const duration = interaction.options.getNumber('duration');
            const notifyDays = interaction.options.getNumber('notify_days') || 3;

            const endDate = new Date();
            endDate.setDate(endDate.getDate() + duration);

            const subscription = new Subscription({
                userId: user.id,
                subscriptionId: uuidv4(),
                name,
                price,
                duration,
                endDate,
                notifyDays
            });

            await subscription.save();

            await interaction.reply({
                content: `✅ Subscription added successfully!\n- Name: ${name}\n- Price: $${price}\n- Duration: ${duration} days\n- Expires: ${endDate.toLocaleDateString()}\n- User: ${user.tag}`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '❌ There was an error while adding the subscription.',
                ephemeral: true
            });
        }
    },
};
