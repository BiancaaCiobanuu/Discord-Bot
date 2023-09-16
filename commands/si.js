const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'si',
  description: 'Send an invite link for the server',
  execute(message, args) {
    // Check if the user has the necessary permissions to use the command
    if (!message.member.permissions.has(Permissions.FLAGS.CREATE_INSTANT_INVITE)) {
      return message.channel.send('You do not have permission to use this command.');
    }

    // Create a new invite with default settings
    message.guild.invites
      .create(message.channel, {
        maxAge: 86400, // 24 hours in seconds
        maxUses: 1, // Only one use allowed
      })
      .then((invite) => {
        // Create an embed with the invite link
        const inviteEmbed = new MessageEmbed()
          .setColor('#00FF00')
          .setTitle('Server Invite Link')
          .setDescription(`Here is an invite link to the server: ${invite.url}`);

        // Send the embed in the channel
        message.channel.send({ embeds: [inviteEmbed] });
      })
      .catch((error) => {
        console.error(error);
        message.channel.send('An error occurred while creating the invite link.');
      });
  },
};
