const Discord = require('discord.js');

module.exports = {
  name: 'av',
  description: 'Get user\'s avatar.',
  execute(message, args) {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${user.username}'s Avatar`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 256 }));

    // Send the embed along with a message content (even if it's an empty string)
    message.channel.send({ content: 'Here is the user\'s avatar:', embeds: [avatarEmbed] });
  },
};
