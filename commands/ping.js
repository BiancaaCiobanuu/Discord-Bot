module.exports = {
  name: 'ping',
  description: 'Check the bot\'s ping to the Discord API.',
  execute(message, args) {
    const ping = Date.now() - message.createdTimestamp;
    message.reply(`Pong! Bot ping: ${ping}ms`);
  },
};
