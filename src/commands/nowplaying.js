const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Shows information about the currently playing song.'),
    async execute(interaction) {
        const { client } = interaction;
        const { requirePlayer } = require('../utils/interactionHelpers');

        const player = await requirePlayer(interaction);
        if (!player) return;

        if (!player.playing || !player.queue.current) {
            return interaction.reply({ 
                content: client.languageManager.get(client.defaultLanguage, 'NOTHING_PLAYING'), 
                ephemeral: true 
            });
        }

        const track = player.queue.current;

        const embed = client.playerController.createPlayerEmbed(player, track);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
}; 