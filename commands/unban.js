module.exports = {
  name: 'unban',
  description: 'Unbans a member from the server.',
  async execute(message, args) {
    // Check if the user has the necessary permissions to use the command
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.channel.send('You do not have permission to use this command.');
    }

    // Check if a user ID was provided
    if (!args[0]) {
      return message.channel.send('Please provide the ID of the user you want to unban.');
    }

    // Get the user ID to unban
    const userID = args[0];

    try {
      // Fetch the banned users from the server's ban list
      const bans = await message.guild.bans.fetch();
      // Check if the user ID is in the ban list
      const bannedUser = bans.find(user => user.user.id === userID);

      if (!bannedUser) {
        return message.channel.send('The specified user is not banned.');
      }

      // Attempt to unban the user and send a success message
      message.guild.members.unban(userID)
        .then(() => {
          message.channel.send(`${bannedUser.user.tag} has been unbanned from the server.`);
        })
        .catch(error => {
          console.error(error);
          message.channel.send('An error occurred while trying to unban the user.');
        });
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while fetching the ban list.');
    }
  },
};
