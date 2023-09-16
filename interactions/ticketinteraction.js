module.exports = {
  async handle(interaction) {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'ticket_reason') {
      const selectedReason = interaction.values[0];
      const ticketCategory = interaction.guild.channels.cache.find((channel) => channel.name === 'tickets' && channel.type === 'GUILD_CATEGORY');

      if (!ticketCategory) {
        await interaction.reply('Ticket category not found. Contact an admin.');
        return;
      }

      const ticketChannel = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
        type: 'GUILD_TEXT',
        parent: ticketCategory,
        permissionOverwrites: [
          { id: interaction.user.id, allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'] },
          { id: interaction.guild.roles.everyone, deny: ['VIEW_CHANNEL'] },
        ],
      });

      await ticketChannel.send(`Welcome to your ticket! Reason: ${selectedReason}`);
      await interaction.reply(`Ticket created in <#${ticketChannel.id}>`);
    }
  },
};
