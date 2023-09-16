const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'gw-reroll',
  description: 'Rerolls a giveaway to pick a new winner.',
  async execute(message, args) {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have the required permissions to reroll a giveaway.');
    }

    // Get the message ID of the giveaway to reroll
    const giveawayMessageID = args[0];

    // Fetch the original giveaway message
    const giveawayMessage = await message.channel.messages.fetch(giveawayMessageID).catch(() => null);

    if (!giveawayMessage) {
      return message.reply('Unable to find the specified giveaway message.');
    }

    // Fetch the reactions on the original giveaway message
    const reactions = giveawayMessage.reactions.cache;

    // Get the participants who reacted
    const participants = (await reactions.first().users.fetch()).filter((user) => !user.bot).map((user) => user);

    if (participants.length === 0) {
      return message.reply('No participants in the original giveaway.');
    }

    // Pick a new winner
    const newWinner = participants[Math.floor(Math.random() * participants.length)];

    // Create and send the winner announcement embed
    const winnerEmbed = new MessageEmbed()
      .setTitle('Giveaway Rerolled!')
      .setDescription(`Congratulations, ${newWinner}! You're the new winner of the giveaway!`)
      .setColor('#00ff00');

    message.channel.send({ embeds: [winnerEmbed] });
  },
};
