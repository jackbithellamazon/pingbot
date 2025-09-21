const { Client, GatewayIntentBits } = require("discord.js");
const http = require("http");

// Create a simple HTTP server for Render
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Discord bot is running!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

// Your Discord bot code
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const MONITORED_CHANNELS = [
  "1413912845724422345", // profitpath 50spm
  "1414172163304591361"  // profitpath high profit
];

const STAFF_TO_PING = "<@1123881830492422174>";

const token = process.env.BOT_TOKEN;

client.once("ready", () => {
  console.log(`✅ Bot logged in successfully as ${client.user.tag}!`);
  console.log(`📋 Monitoring channels: ${MONITORED_CHANNELS.join(', ')}`);
});

client.on("messageCreate", (message) => {
  console.log(`🔍 Message seen:`);
  console.log(`  Channel ID: ${message.channel.id}`);
  console.log(`  Channel Name: ${message.channel.name}`);
  console.log(`  Author: ${message.author.tag} (Bot: ${message.author.bot})`);
  
  if (message.author.id === client.user.id) {
    console.log(`  ⏭️ Skipping own message`);
    return;
  }
  
  if (MONITORED_CHANNELS.includes(message.channel.id)) {
    console.log(`  ✅ Message is in monitored channel!`);
    
    message.channel.send(`Heads up ${STAFF_TO_PING}, a new webhook message was posted.`)
      .then(() => console.log(`  📤 Ping sent successfully`))
      .catch(err => console.log(`  ❌ Failed to send ping: ${err}`));
  } else {
    console.log(`  ❌ Message not in monitored channels`);
  }
});

client.login(token);
