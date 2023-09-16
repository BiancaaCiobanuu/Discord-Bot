module.exports = {
  name: 'setnick',
  description: 'Set a new nickname for a user.',
  execute(message, args) {
    if (!message.member.permissions.has('CHANGE_NICKNAME')) {
      return message.reply('You do not have permission to change nicknames.');
    }

    const member = message.mentions.members.first();

    if (!member) {
      return message.reply('You need to mention a user to set their nickname.');
    }

    const newNickname = args.slice(1).join(' ');

    if (!newNickname) {
      return message.reply('You need to provide a new nickname.');
    }

    member.setNickname(newNickname)
      .then(() => {
        message.reply(`Nickname for ${member.user.tag} has been set to "${newNickname}"`);
      })
      .catch(error => {
        console.error(error);
        if (error.code === 50013) {
          message.reply('I do not have permission to change this user\'s nickname.');
        } else {
          message.reply('An error occurred while setting the nickname.');
        }
      });
  },
};