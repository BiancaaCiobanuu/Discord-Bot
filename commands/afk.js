// afk.js
module.exports = {
  name: 'afk',
  description: 'Set your AFK status.',
  execute(message, args, afkUsers) {
    const reason = args.join(' ');
    afkUsers[message.author.id] = reason;
    message.reply(`You are now AFK: ${reason}`);
  },
};
