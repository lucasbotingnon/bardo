const { SlashCommandBuilder } = require('discord.js');
const { requirePlayer } = require('../utils/interactionHelpers');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses or resumes playback.'),
    async execute(interaction) {
        const { client } = interaction;

        const player = await requirePlayer(interaction);
        if (!player) return;

        if (player.paused) {
            await player.resume();
            return interaction.reply({ 
                content: client.languageManager.get(client.defaultLanguage, 'RESUMED'), 
                ephemeral: true 
            });
        } else {
            await player.pause();
            return interaction.reply({ 
                content: client.languageManager.get(client.defaultLanguage, 'PAUSED'), 
                ephemeral: true 
            });
        }
    },
}; 