const mineflayer = require('mineflayer');

const HOST = 'teamunk561.aternos.me';
const PORT = 60669;
const USERNAME = 'OndoxKaPapa';

function createBot() {
  console.log(`Connecting to ${HOST}:${PORT}...`);

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    auth: 'offline'
  });

  bot.once('spawn', () => {
    console.log('OndoxKaPapa joined the server!');

    // Har 30 seconds thoda move karke AFK kick se bachne ki koshish
    setInterval(() => {
      if (!bot.entity) return;

      bot.setControlState('forward', true);

      setTimeout(() => {
        bot.setControlState('forward', false);
      }, 1000);
    }, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });
}

createBot();
