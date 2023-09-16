const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'color',
  description: 'Display a color based on a hex code or color name.',
  execute(message, args) {
    const colorInput = args[0];

    // Function to convert color names to hex codes
    const colorNameToHex = (color) => {
      const colorList = {
        red: '#FF0000',
        green: '#00FF00',
        blue: '#0000FF',
        yellow: '#F1FF00',
        green: '#48FF00',
        cyan: '#00FFFD',
        oringi: '#FF9014',
        purple: '#7900FF',
        magenta: '#DE00FF',
        pink: '#FF00E8',
        hotpink: '#FF007F',
        neon: '#0CFF76',
        violet: '#D07DD3',
      };
      return colorList[color.toLowerCase()] || null;
    };

    let hexColor = colorInput.startsWith('#') ? colorInput : colorNameToHex(colorInput);

    if (!hexColor) {
      return message.channel.send('Invalid color code or name.');
    }

    // Create an embed to display the color
    const colorEmbed = new MessageEmbed()
      .setColor(hexColor)
      .setTitle('Color Display')
      .setDescription(`Color: ${hexColor}`)
      .setImage(`https://via.placeholder.com/200/${hexColor.slice(1)}/${hexColor.slice(1)}`);

    // Send the embed in the channel
    message.channel.send({ embeds: [colorEmbed] });
  },
};
