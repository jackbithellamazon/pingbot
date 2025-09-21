const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Example: reply when someone types "asin:"
client.on("messageCreate", (message) => {
  if (message.author.bot) return; // ignore bot messages

  if (message.content.includes("asin:")) {
    // replace with your staff member ID
    message.channel.send(`<@1123881830492422174> Check this out: ${message.content}`);
  }
});

// Use the token from Railway (environment variable)
client.login(process.env.DISCORD_TOKEN);

