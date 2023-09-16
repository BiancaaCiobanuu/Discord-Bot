const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'gw-start',
  description: 'Starts a giveaway.',
  execute(message, args) {
    // Check if the user has permission to start a giveaway
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have the required permissions to start a giveaway.');
    }

    // Get the giveaway duration and prize from the command arguments
    const duration = args[0];
    const prize = args.slice(1).join(' ');

    // Check if the duration and prize are provided
    if (!duration || !prize) {
      return message.reply('Please provide the duration and prize for the giveaway.');
    }

    const durationInSeconds = parseInt(duration, 10);
    const durationInMilliseconds = durationInSeconds * 1000;

    // Create a new giveaway embed
    const giveawayEmbed = new MessageEmbed()
      .setTitle('🎉 Giveaway Time!')
      .setDescription(`Prize: ${prize}\nDuration: ${duration}`)
      .setColor('#00ff00')
      .setFooter('React with 🎉 to participate!', message.author.displayAvatarURL()); // Use the author's avatar as the footer icon

    // Send the giveaway embed
    message.channel.send({ embeds: [giveawayEmbed] }).then((msg) => {
      // Add the reaction to the giveaway message
      msg.react('🎉');

      // Set up a collector to listen for reactions
      const filter = (reaction, user) => reaction.emoji.name === '🎉' && !user.bot;
      const collector = msg.createReactionCollector({ filter, time: durationInMilliseconds });

      // When the time is up, pick a winner
collector.on('end', async (collected) => {
  const winnerReaction = collected.first();
  if (winnerReaction) {
    const winner = await winnerReaction.users.fetch();
    const winnerUser = winner.filter(user => !user.bot).first();

    if (winnerUser) {
      message.channel.send(`Congratulations, ${winnerUser.tag}! You've won the giveaway of ${prize}!`);
    } else {
      message.channel.send('No one participated in the giveaway. Better luck next time!');
    }
  } else {
    message.channel.send('No one participated in the giveaway. Better luck next time!');
  }})})}};
