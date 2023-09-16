const { MessageActionRow, MessageSelectMenu, Permissions } = require('discord.js');

module.exports = {
  name: 'openticket',
  description: 'Open a support ticket.',
  execute(message, args) {
    const ticketReasons = ['Support', 'Report', 'Feedback', 'Other'];

    const selectMenu = new MessageSelectMenu()
      .setCustomId('ticket_reason')
      .setPlaceholder('Select a reason for the ticket')
      .addOptions(ticketReasons.map((reason) => ({ label: reason, value: reason })));

    const row = new MessageActionRow().addComponents(selectMenu);

    message.reply({ content: 'Please select a reason for the ticket:', components: [row] });
  },
};
