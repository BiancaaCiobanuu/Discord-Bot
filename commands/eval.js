const { inspect } = require('util');

module.exports = {
  name: 'eval',
  description: 'Evaluate JavaScript code',
  async execute(message, args) {
    if (message.author.id !== '870366927653056582') {
      return message.reply('You do not have permission to use this command.');
    }

    const code = args.join(' ');

    try {
      let evaled = eval(code);

      if (typeof evaled !== 'string') {
        evaled = inspect(evaled);
      }

      message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
    } catch (err) {
      message.channel.send(`Error: \`\`\`js\n${err}\`\`\``);
    }
  },
};
