module.exports = {
    name: 'guilds',
    description: 'List all the guilds the bot is in.',
    execute(message, args, client) {
        const guilds = client.guilds.cache.map(guild => `${guild.name} (ID: ${guild.id})`);

        message.channel.send(`I'm in the following guilds:\n${guilds.join('\n')}`);
    },
};
