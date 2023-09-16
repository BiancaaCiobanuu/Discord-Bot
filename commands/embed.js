const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'embed',
  description: 'Create a custom embed.',
  execute(message, args) {
    // Check if the user provided a title and description
    if (args.length < 2) {
      return message.channel.send('Please provide both a title and a description.');
    }

    const title = args[0];
    const description = args.slice(1).join(' ');

    // Create the embed
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor('#FF5733'); // You can change the color here

    // Send the embed in the channel
    message.channel.send({ embeds: [embed] });
  },
};
