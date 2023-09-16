module.exports = {
    name: 'unmute',
    description: 'Unmute a user.',
    permissions: ['MANAGE_ROLES'],
    execute(message, args) {
        const targetUser = message.mentions.users.first();

        if (!targetUser) {
            return message.reply('Please mention a user to unmute.');
        }

        const member = message.guild.members.cache.get(targetUser.id);
        if (!member) {
            return message.reply('The mentioned user is not in this server.');
        }

        const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        if (!mutedRole) {
            return message.reply('The Muted role does not exist. Please create it.');
        }

        if (!member.roles.cache.some(role => role.name === 'Muted')) {
            return message.reply('The user is not muted.');
        }

        const userRoles = member.roles.cache.filter(role => role.name !== 'Muted');

        member.roles.set(userRoles) // Set back to the user's original roles
            .then(() => {
                message.reply(`${member.user.tag} has been unmuted.`);
            })
            .catch(error => {
                console.error(error);
                message.reply('There was an error unmuting the user.');
            });
    },
};
