const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Displays the song queue.'),
    async execute(interaction) {
        const { client } = interaction;
        const { requirePlayer } = require('../utils/interactionHelpers');
        const { formattedQueue } = require('../utils/PlayerActions');

        const player = await requirePlayer(interaction, { requireQueue: true });
        if (!player) return;

        const queueString = formattedQueue(player, 10);

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(client.languageManager.get(client.defaultLanguage, 'QUEUE_TITLE'))
            .setDescription(queueString || client.languageManager.get(client.defaultLanguage, 'QUEUE_NO_TRACKS'));

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
}; 