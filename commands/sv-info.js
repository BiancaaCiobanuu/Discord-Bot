const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'server-info',
  aliases: ['sv-info'],
  description: 'Display information about the server',
  execute(message, args) {
    // Check if the user has the necessary permissions to use the command
    if (!message.member.permissions.has('SEND_MESSAGES')) {
      return message.channel.send('You do not have permission to use this command.');
    }

    // Get the server information
    const server = message.guild;

    // Create an embed to display the server information
    const embed = new MessageEmbed()
      .setColor('#3498db')
      .setTitle(`Server Information for ${server.name}`);

    // Helper function to handle empty or undefined values
    const getValue = (value) => (value ? value : 'N/A');

    // Add fields with valid non-empty strings as values
    embed.addFields(
      { name: 'Server ID', value: getValue(server.id) },
      { name: 'Owner', value: getValue(server.owner && server.owner.user ? server.owner.user.tag : '`kanami_._`') },
      { name: 'Region', value: getValue(server.region) },
      { name: 'Members', value: getValue(server.memberCount.toString()), inline: true },
      { name: 'Creation Date', value: getValue(server.createdAt ? server.createdAt.toDateString() : 'Tue / March / 28 / 2023'), inline: true },
      { name: 'Verification Level', value: getValue(server.verificationLevel.toString()), inline: true },
      { name: 'Explicit Content Filter', value: getValue(server.explicitContentFilter), inline: true },
      { name: 'Roles Count', value: getValue(server.roles.cache.size.toString()), inline: true },
      { name: 'Channels Count', value: getValue(server.channels.cache.size.toString()), inline: true }
    )
    .setThumbnail(server.iconURL({ dynamic: true, size: 2048 }))
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }));

    // Send the embed in the channel
    message.channel.send({ embeds: [embed] });
  },
};
