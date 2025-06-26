const { SlashCommandBuilder } = require('discord.js');
const { requirePlayer } = require('../utils/interactionHelpers');
const { shuffleQueue } = require('../utils/PlayerActions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles the queue.'),
    async execute(interaction) {
        const { client } = interaction;

        const player = await requirePlayer(interaction, { requireQueue: true });
        if (!player) return;

        shuffleQueue(player);

        return interaction.reply({ 
            content: client.languageManager.get(client.defaultLanguage, 'QUEUE_SHUFFLED'), 
            ephemeral: true 
        });
    },
}; 