module.exports = {
  name: 'ban',
  description: 'Bans a member from the server.',
  execute(message, args) {
    // Check if the user has the necessary permissions to use the command
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.channel.send('You do not have permission to use this command.');
    }

    // Check if a user mention was provided
    if (!args[0]) {
      return message.channel.send('Please mention the user you want to ban.');
    }

    // Get the user to ban from the mention
    const user = message.mentions.users.first();

    // Check if the user is valid and exists in the server
    if (!user) {
      return message.channel.send('Invalid user. Please mention a valid user to ban.');
    }

    // Get the member of the server from the user mention
    const member = message.guild.members.cache.get(user.id);

    // Check if the member can be banned
    if (!member.bannable) {
      return message.channel.send('The specified user cannot be banned.');
    }

    // Attempt to ban the user and send a success message
    member.ban()
      .then(() => {
        message.channel.send(`${user.tag} has been banned from the server.`);
      })
      .catch(error => {
        console.error(error);
        message.channel.send('An error occurred while trying to ban the user.');
      });
  },
};
