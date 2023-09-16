// clearafk.js
module.exports = {
  name: 'clearafk',
  description: 'Clear your AFK status.',
  execute(message, args, afkUsers) {
    delete afkUsers[message.author.id];
    message.reply('Your AFK status has been cleared.');
  },
};
