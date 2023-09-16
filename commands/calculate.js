module.exports = {
  name: 'calculator',
  description: 'Perform calculations.',
  execute(message, args) {
    if (args.length !== 1) {
      message.reply('Usage: k!calculator [expression]');
      return;
    }

    const expression = args[0];
    try {
      const result = eval(expression);
      message.reply(`Result: ${result}`);
    } catch (error) {
      message.reply('An error occurred while evaluating the expression.');
    }
  },
};
