const fs = require('fs');
require('dotenv').config();
const { token, guildId } = require('./config.json');
const mongoose = require('mongoose');
const { Client, Intents, Collection, Permissions, MessageButton, MessageActionRow } = require('discord.js');

mongoose.connect('mongodb+srv://biancaciobanuuuu:RxxQdHjfa73MGVrx@cluster0.gpwtddu.mongodb.net/Sapphire?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const prefix = '?'

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

client.commands = new Collection();

// Load commands from the 'commands' folder
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Sapphire is online!');
  client.user.setPresence({
    status: 'dnd',
    activities: [
      {
        name: 'Sapphire | ?help for more',
        type: 'PLAYING',
      },
    ],
  });
});

function logAction(actionDescription) {
  const guild = client.guilds.cache.get('1148329009323708530');

  if (!guild) {
    console.error('Guild not found.');
    return;
  }

  const logsChannel = guild.channels.cache.get('1152526143438725170');
  if (!logsChannel) {
    console.error('Logs channel not found.');
    return;
  }

  if (logsChannel.isText()) {
    logsChannel.send(`Action: ${actionDescription}`);
  }
}
          
// Log when the bot joins a server
client.on('guildCreate', (guild) => {
  logAction(`Bot joined server: ${guild.name}`);
});

// Log when the bot is removed from a server
client.on('guildDelete', (guild) => {
  logAction(`Bot removed from server: ${guild.name}`);
});

// Log when a member joins the server
client.on('guildMemberAdd', (member) => {
  logAction(`Member joined: ${member.user.tag}`);
});

// Log when a member leaves the server
client.on('guildMemberRemove', (member) => {
  logAction(`Member left: ${member.user.tag}`);
});

// Log when a message is deleted
client.on('messageDelete', (message) => {
  logAction(`Message deleted by ${message.author.tag}: "${message.content}"`);
});

// Log when a message is edited
client.on('messageUpdate', (oldMessage, newMessage) => {
  logAction(`Message edited by ${oldMessage.author.tag}: "${oldMessage.content}" -> "${newMessage.content}"`);
});

// Log when a user is banned from the server
client.on('guildBanAdd', (guild, user) => {
  logAction(`User banned: ${user.tag}`);
});

// Log when a user is unbanned from the server
client.on('guildBanRemove', (guild, user) => {
  logAction(`User unbanned: ${user.tag}`);
});

// Log when a user changes their nickname
client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.nickname !== newMember.nickname) {
    logAction(`${newMember.user.tag} changed nickname: ${oldMember.nickname || 'None'} -> ${newMember.nickname || 'None'}`);
  }
});
// Log when a user starts streaming
client.on('streamingStart', (user, streamURL) => {
  logAction(`${user.tag} started streaming: ${streamURL}`);
});

// Log when a user stops streaming
client.on('streamingStop', (user) => {
  logAction(`${user.tag} stopped streaming`);
});

// Log when a message is bulk-deleted (multiple messages at once)
client.on('messageDeleteBulk', (messages) => {
  const deletedMessageCount = messages.size;
  logAction(`Bulk delete: ${deletedMessageCount} messages deleted`);
});

// Log when a user is muted in a voice channel
client.on('guildMemberMute', (member) => {
  logAction(`Member ${member.user.tag} was muted`);
});

// Log when a user is unmuted in a voice channel
client.on('guildMemberUnmute', (member) => {
  logAction(`Member ${member.user.tag} was unmuted`);
});

// Log when a user joins a voice channel
client.on('voiceChannelJoin', (member, channel) => {
  logAction(`${member.user.tag} joined voice channel: ${channel.name}`);
});

// Log when a user leaves a voice channel
client.on('voiceChannelLeave', (member, channel) => {
  logAction(`${member.user.tag} left voice channel: ${channel.name}`);
});

// Log when a channel is created
client.on('channelCreate', (channel) => {
  logAction(`Channel created: ${channel.name}`);
});

// Log when a channel is updated (name, topic, permissions, etc.)
client.on('channelUpdate', (oldChannel, newChannel) => {
  logAction(`Channel updated: ${oldChannel.name} -> ${newChannel.name}`);
});

// Log when a channel is deleted
client.on('channelDelete', (channel) => {
  logAction(`Channel deleted: ${channel.name}`);
});

// Log when a member's roles are updated
client.on('guildMemberUpdate', (oldMember, newMember) => {
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

  if (addedRoles.size > 0) {
    logAction(`${newMember.user.tag} was given roles: ${addedRoles.map(role => role.name).join(', ')}`);
  }

  if (removedRoles.size > 0) {
    logAction(`${newMember.user.tag} had roles removed: ${removedRoles.map(role => role.name).join(', ')}`);
  }
});

// Log when a message is pinned or unpinned
client.on('messageUpdate', (oldMessage, newMessage) => {
  if (oldMessage.pinned !== newMessage.pinned) {
    const action = newMessage.pinned ? 'pinned' : 'unpinned';
    logAction(`Message ${action}: "${newMessage.content}"`);
  }
});

// Log when a user starts typing in a channel
client.on('typingStart', (channel, user) => {
  logAction(`${user.tag} started typing in ${channel.name}`);
});

// Log when a user stops typing in a channel
client.on('typingStop', (channel, user) => {
  logAction(`${user.tag} stopped typing in ${channel.name}`);
});

// Log when a new emoji is added to the server
client.on('emojiCreate', (emoji) => {
  logAction(`New emoji added: ${emoji.name}`);
});

// Log when an emoji is updated (name or image)
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  logAction(`Emoji updated: ${oldEmoji.name} -> ${newEmoji.name}`);
});

// Log when an emoji is deleted
client.on('emojiDelete', (emoji) => {
  logAction(`Emoji deleted: ${emoji.name}`);
});

// Log when a role is created in the server
client.on('roleCreate', (role) => {
  logAction(`Role created: ${role.name}`);
});

// Log when a role is updated (name, permissions, etc.)
client.on('roleUpdate', (oldRole, newRole) => {
  logAction(`Role updated: ${oldRole.name} -> ${newRole.name}`);
});

// Log when a role is deleted
client.on('roleDelete', (role) => {
  logAction(`Role deleted: ${role.name}`);
});

const afkUsers = {};

client.on('message', async message => {
    if (message.author.bot) return; // Ignore messages from bots

    // Split the message content into command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return; // If command doesn't exist, do nothing

    const command = client.commands.get(commandName);

    try {
        // Execute the command with the DM channel as the destination
        await command.execute(message, args, client, true);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command.');
    }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === 'ticket_reason') {
    const selectedReason = interaction.values[0];

    const ticketCategory = interaction.guild.channels.cache.find((channel) =>
      channel.type === 'GUILD_CATEGORY' && channel.name === '『🎫』TICKETS ZONE『🎫』'
    );

    if (!ticketCategory) {
      await interaction.reply('Ticket category does not exist. Contact server administration.');
      return;
    }

    const botMember = interaction.guild.members.cache.get(client.user.id);
    const botRole = interaction.guild.roles.cache.find(role => role.name === "⁎⁺˳✧༚ Community Bots");
    
    const ticketChannel = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
      type: 'GUILD_TEXT',
      parent: ticketCategory,
      permissionOverwrites: [
        {
          id: interaction.user.id,
          allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
        },
        {
          id: botRole.id,
          allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: [Permissions.FLAGS.VIEW_CHANNEL],
        },
      ],
    });

    const ticketMessage = await ticketChannel.send({
      content: `Ticket created by ${interaction.user.tag} with reason: ${selectedReason}`,
    });

    const closeButton = new MessageButton()
      .setCustomId('close_ticket')
      .setLabel('Close Ticket')
      .setStyle('DANGER');

    const row = new MessageActionRow().addComponents(closeButton);
    await ticketMessage.edit({ components: [row] });

    interaction.reply({ content: 'Your ticket has been created.', ephemeral: true });
  }
});


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'close_ticket' && interaction.channel.parent) {
    if (interaction.channel.parent.name.toLowerCase().startsWith('ticket')) {
      const opener = interaction.channel.lastMessage.content.split(' ')[3];

      if (
        interaction.user.tag === opener ||
        interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
      ) {
        // Delete the ticket channel
        await interaction.channel.delete();
      } else {
        interaction.reply({ content: 'You do not have permission to close this ticket.', ephemeral: true });
      }
    }
  }
});


client.commands.set('help', require('./commands/help'));
client.commands.set('jail', require('./commands/jail'));
client.commands.set('unjail', require('./commands/unjail'));
client.commands.set('ban', require('./commands/ban'));
client.commands.set('server-info', require('./commands/sv-info'));
client.commands.set('si', require('./commands/si'));
client.commands.set('unban', require('./commands/unban'));
client.commands.set('gw-start', require('./commands/gw-start'));
client.commands.set('gw-reroll', require('./commands/gw-reroll'));
client.commands.set('restart', require('./commands/restart'))
client.commands.set('remind', require('./commands/remind'));
client.commands.set('calculate', require('./commands/calculate'));
client.commands.set('uptime', require('./commands/uptime'));
client.commands.set('avatar', require('./commands/avatar'));
client.commands.set('iplookup', require('./commands/iplookup'))
client.commands.set('addrole', require('./commands/addrole'));
client.commands.set('removerole', require('./commands/removerole'));
client.commands.set('afk', require('./commands/afk'));
client.commands.set('clearafk', require('./commands/clearafk'));
client.commands.set('eval', require('./commands/eval'));
client.commands.set('userinfo', require('./commands/userinfo'))
client.commands.set('color', require('./commands/color'));
client.commands.set('embed', require('./commands/embed'));
client.commands.set('ping', require('./commands/ping'));
client.commands.set('setnick', require('./commands/setnick'));
client.commands.set('unmute', require('./commands/unmute'));
client.commands.set('guilds', require('./commands/guilds'));
client.commands.set('leave', require('./commands/leave'));

client.login(token);
