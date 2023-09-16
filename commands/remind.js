module.exports = {
  name: 'remind',
  description: 'Set a reminder.',
  execute(message, args) {
    if (args.length < 2) {
      message.reply('Usage: k!remind [time] [reminder]');
      return;
    }

    const time = args.shift();
    const reminder = args.join(' ');

    // Parse the time and convert it to milliseconds
    const parsedTime = parseTime(time);
    if (parsedTime === null) {
      message.reply('Invalid time format. Please use formats like 10s, 1h, 2d.');
      return;
    }

    // Set a timeout to send the reminder
    setTimeout(() => {
      message.reply(`Here's your reminder: ${reminder}`);
    }, parsedTime);
  },
};

function parseTime(time) {
  const units = {
    s: 1000, // seconds
    m: 60 * 1000, // minutes
    h: 60 * 60 * 1000, // hours
    d: 24 * 60 * 60 * 1000, // days
  };

  const regex = /(\d+)([smhd])/;
  const match = regex.exec(time);

  if (match) {
    const amount = parseInt(match[1]);
    const unit = match[2];
    return amount * units[unit];
  }

  return null;
}
