module.exports = {
    name: 'unjail',
    description: 'Unjail a user.',
    permissions: ['MANAGE_ROLES'],
    execute(message, args) {
        const targetUser = message.mentions.users.first();

        if (!targetUser) {
            return message.reply('Please mention a user to unjail.');
        }

        const member = message.guild.members.cache.get(targetUser.id);
        if (!member) {
            return message.reply('The mentioned user is not in this server.');
        }

        const jailRole = message.guild.roles.cache.find(role => role.name === 'Jail');

        if (!jailRole) {
            return message.reply('The Jail role does not exist. Please create it.');
        }

        if (!member.roles.cache.some(role => role.name === 'Jail')) {
            return message.reply('The user is not jailed.');
        }

        const userRoles = member.roles.cache.filter(role => role.name !== 'Jail');

        member.roles.set(userRoles) // Set back to the user's original roles
            .then(() => {
                message.reply(`${member.user.tag} has been unjailed.`);
            })
            .catch(error => {
                console.error(error);
                message.reply('There was an error unjailing the user.');
            });
    },
};
