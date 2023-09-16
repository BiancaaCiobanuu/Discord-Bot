module.exports = {
  name: 'shutdown',
  description: 'shutdown the bot.',
  execute(message) {
    // Check if the user has permission to shut down the bot
    if (message.author.id !== '870366927653056582') {
      return message.reply('You do not have the required permissions to shut down the bot.');
    }

    message.reply('Shutting down...').then(() => {
      // Log a message and then gracefully exit the process
      console.log('Bot is stopping...');
      process.exit(1);
    });
  },
};
