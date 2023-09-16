module.exports = {
  name: 'rr',
  description: 'Remove role',
  async execute(message, args) {
    // Check if the author has permission to use this command
    if (message.author.id !== '870366927653056582') {
      return message.reply('You do not have permission to use this command.');
    }

    // Check if there are enough arguments
    if (args.length < 2) {
      return message.reply('Please mention a valid user and role.');
    }

    // Extract user and role from message mentions
    const user = message.mentions.users.first();
    const role = message.mentions.roles.first();

    // Check if user and role were mentioned
    if (!user || !role) {
      return message.reply('Please mention a valid user and role.');
    }

    // Get the member (user) from the server
    const member = message.guild.members.cache.get(user.id);

    // Check if the member was found
    if (!member) {
      return message.reply('User not found in the server.');
    }

    // Remove the role from the member
    member.roles
      .remove(role)
      .then(() => {
        message.reply(`Removed ${role.name} role from ${user.tag}.`);
      })
      .catch((error) => {
        console.error('Error removing role:', error);
        message.reply('An error occurred while removing the role.');
      });
  },
};
