// jail.js
const { Permissions } = require('discord.js');

module.exports = {
  name: 'jail',
  description: 'Puts a user in jail.',
  execute(message, args) {
    // Check if the user has the necessary permissions to use the command
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
      return message.channel.send('You do not have permission to use this command.');
    }

    // Check if a user mention was provided
    if (!args[0]) {
      return message.channel.send('Please mention the user you want to jail.');
    }

    // Get the user to jail from the mention
    const user = message.mentions.users.first();

    // Check if the user is valid and exists in the server
    if (!user) {
      return message.channel.send('Invalid user. Please mention a valid user to jail.');
    }

    // Get the member of the server from the user mention
    const member = message.guild.members.cache.get(user.id);

    // Jail the member
    jailMember(member, message);
  },
};

// Function to jail a member
function jailMember(member, message) {
  const jailRoleName = 'Jail';
  const jailRole = message.guild.roles.cache.find((role) => role.name === jailRoleName);

  if (!jailRole) {
    createRole(message.guild, jailRoleName, 'GRAY')
      .then((role) => {
        member.roles.set([role]);
        message.channel.send(`${member.user.tag} has been jailed successfully.`);
      })
      .catch((error) => {
        console.error(error);
        message.channel.send('An error occurred while creating or setting the jail role.');
      });
  } else {
    member.roles.set([jailRole]);
    message.channel.send(`${member.user.tag} has been jailed successfully.`);
  }
}

// Function to create a role
function createRole(guild, roleName, color) {
  return guild.roles
    .create({
      data: {
        name: roleName, // Use the roleName variable here
        color: color,
      },
      reason: 'Jail role needed for moderation',
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
