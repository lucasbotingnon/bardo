module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        
        // Initialize Lavalink
        await client.lavalink.init({ ...client.user });
        console.log('Lavalink initialized');
        
        // Set presence
        client.user.setActivity('música 🎵', { type: 2 }); // Type 2 = LISTENING
    },
}; 