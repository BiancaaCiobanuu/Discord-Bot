module.exports = {
  name: 'uptime',
  description: 'Check bot uptime.',
  execute(message) {
    const uptime = formatUptime(process.uptime());
    message.reply(`Bot has been up for: ${uptime}`);
  },
};

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemainder = seconds % 60;

  return `${hours}h ${minutes}m ${secondsRemainder}s`;
}
