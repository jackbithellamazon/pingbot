const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Your specific channels and user
const MONITORED_CHANNELS = [
  "1413912845724422345", // profitpath 50spm
  "1414172163304591361"  // profitpath high profit
];

const STAFF_TO_PING = "<@1123881830492422174>";

const token = process.env.BOT_TOKEN;

client.once("ready", () => {
  console.log(`✅ Bot logged in successfully as ${client.user.tag}!`);
});

// Listen for messages (including webhook messages)
client.on("messageCreate", (message) => {
  // Skip bot's own messages
  if (message.author.id === client.user.id) return;
  
  // Check if in monitored channel
  if (MONITORED_CHANNELS.includes(message.channel.id)) {
    console.log(`📨 Message detected in monitored channel`);
    
    // Send the ping
    message.channel.send(`Heads up ${STAFF_TO_PING}, a new webhook message was posted.`);
  }
});

client.login(token);
