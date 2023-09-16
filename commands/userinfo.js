const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Display information about a mentioned user.',
  execute(message) {
    // Get the mentioned user
    const user = message.mentions.users.first() || message.author;

    // Create an embed to display user information
    const userEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('User Information')
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addField('Username', user.tag, true)
      .addField('User ID', user.id, true)
      .addField('Account Created', user.createdAt.toUTCString(), true)
      .addField('Joined Server', message.guild.members.cache.get(user.id).joinedAt.toUTCString(), true)
      .addField('Roles', message.guild.members.cache.get(user.id).roles.cache.map(role => role.name).join(', ') || 'None');

    // Send the embed in the channel
    message.channel.send({ embeds: [userEmbed] });
  },
};
