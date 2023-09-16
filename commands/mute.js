module.exports = {
    name: 'mute',
    description: 'Mute a user.',
    permissions: ['MANAGE_ROLES'],
    execute(message, args) {
        const targetUser = message.mentions.users.first();

        if (!targetUser) {
            return message.reply('Please mention a user to mute.');
        }

        const member = message.guild.members.cache.get(targetUser.id);
        if (!member) {
            return message.reply('The mentioned user is not in this server.');
        }

        const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        if (!mutedRole) {
            return message.reply('The Muted role does not exist. Please create it.');
        }

        if (member.roles.cache.some(role => role.name === 'Muted')) {
            return message.reply('The user is already muted.');
        }

        const userRoles = member.roles.cache.filter(role => role.name !== '@everyone');
        
        member.roles.set([mutedRole]) // Set to only the Muted role
            .then(() => {
                message.reply(`${member.user.tag} has been muted.`);
            })
            .catch(error => {
                console.error(error);
                message.reply('There was an error muting the user.');
            });
    },
};

