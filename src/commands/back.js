const { SlashCommandBuilder } = require('discord.js');
const { requirePlayer } = require('../utils/interactionHelpers');
const { playPrevious } = require('../utils/PlayerActions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('back')
        .setDescription('Goes back to the previous song.'),
    async execute(interaction) {
        const { client } = interaction;

        const player = await requirePlayer(interaction);
        if (!player) return; // Error already handled by helper

        const track = await playPrevious(player);

        if (!track) {
            return interaction.reply({ 
                content: client.languageManager.get(client.defaultLanguage, 'NO_PREVIOUS_SONG'), 
                ephemeral: true 
            });
        }

        return interaction.reply({ 
            content: client.languageManager.get(client.defaultLanguage, 'PLAYING_PREVIOUS', track.info?.title || 'Unknown'), 
            ephemeral: true 
        });
    },
}; 