const { MessageEmbed } = require('discord.js');
const ipinfo = require('ipinfo');

module.exports = {
  name: 'iplookup',
  description: 'Retrieve information about an IP address.',
  async execute(message, args) {
    if (args.length !== 1) {
      message.reply('Usage: k!iplookup [IP address]');
      return;
    }

    const ipAddress = args[0];

    try {
      const ipDetails = await ipinfo(ipAddress);

      const embed = new MessageEmbed()
        .setColor('#3498db')
        .setTitle(`IP Lookup for ${ipAddress}`);

      // Add fields only if the values are non-empty strings
      if (ipDetails.ip) embed.addField('IP Address', ipDetails.ip);
      if (ipDetails.city) embed.addField('City', ipDetails.city);
      if (ipDetails.region) embed.addField('Region', ipDetails.region);
      if (ipDetails.country) embed.addField('Country', ipDetails.country);
      // ... (add other fields as needed)

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error looking up IP:', error);
      message.channel.send('An error occurred while looking up the IP address.');
    }
  },
};
