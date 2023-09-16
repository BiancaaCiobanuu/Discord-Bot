const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Show available commands and their descriptions',
  execute(message, args, client) {
    // Check if the user has the necessary permissions to use the command
    if (!message.member.permissions.has('READ_MESSAGE_HISTORY')) {
      return message.channel.send('You do not have permission to use this command.');
    }

    // Create an embed for the help message
    const helpEmbed = new MessageEmbed()
      .setTitle('List of Available Commands')
      .setDescription('Here is a list of all available commands and their descriptions:')
      .setColor('#200cff');

    // If no specific command is mentioned, send a list of all available commands
    if (args.length === 0) {
      client.commands.forEach(command => {
        if (command.name && command.description) {
          const name = command.name.trim();
          const description = command.description.trim();
          if (name.length > 0 && description.length > 0) {
            // Check if name and description are non-empty strings
            helpEmbed.addFields({ name: name, value: description });
          }
        }
      });

      // Send the embed as a direct message to the user
      message.author.send({ embeds: [helpEmbed] })
        .then(() => {
          message.channel.send('I have sent you a DM with the list of available commands.');
        })
        .catch(() => {
          message.channel.send('I couldn\'t send you a DM. Please enable DMs from server members.');
        });
    } else {
      // If a specific command is mentioned, provide information about that specific command
      const commandName = args[0].toLowerCase();
      const command = client.commands.get(commandName);

      if (!command) {
        return message.channel.send('That command does not exist.');
      }

      const usage = command.usage ? `Usage: ${command.usage}` : '';

      const commandInfo = new MessageEmbed()
        .setTitle(`Command: ${command.name}`)
        .setDescription(command.description)
        .addField('Usage', usage)
        .setColor('#200cff');

      message.channel.send({ embeds: [commandInfo] });
    }
  },
};
