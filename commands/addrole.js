module.exports = {
  name: 'eval',
  description: 'Evaluate JavaScript code',
  async execute(message, args) {
    if (message.author.id !== '870366927653056582') {
      return message.reply('You do not have permission to use this command.');
    }

    const user = message.mentions.users.first();
    const role = message.guild.roles.cache.get(args[1]); // Get role by ID

    if (!user || !role) {
      message.reply('Please mention a valid user and provide a valid role ID.');
      return;
    }

    const member = message.guild.members.cache.get(user.id);

    if (!member) {
      message.reply('User not found in the server.');
      return;
    }

    member.roles.add(role)
      .then(() => {
        message.reply(`Added ${role.name} role to ${user.tag}.`);
      })
      .catch((error) => {
        console.error('Error adding role:', error);
        message.reply('An error occurred while adding the role.');
      });
  },
};
