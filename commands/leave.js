module.exports = {
    name: 'leave',
    description: 'Leave a guild by providing its ID.',
    permissions: ['870366927653056582'], // Replace with the actual permission required to use this command
    execute(message, args, client) {
        const guildId = args[0];

        if (!guildId) {
            return message.reply('Please provide a guild ID.');
        }

        const guild = client.guilds.cache.get(guildId);

        if (!guild) {
            return message.reply('I am not a member of the provided guild.');
        }

        guild.leave()
            .then(() => {
                message.reply(`Successfully left the guild ${guild.name} (ID: ${guild.id}).`);
            })
            .catch(error => {
                console.error(error);
                message.reply('There was an error leaving the guild.');
            });
    },
};
