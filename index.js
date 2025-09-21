const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// When bot is ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Listen for messages
client.on("messageCreate", (message) => {
  if (message.author.bot) return; // ignore bots

  // Trigger when "asin:" is in the message
  if (message.content.toLowerCase().includes("asin:")) {
    // Replace with your staff member’s user ID
    message.channel.send(`<@1123881830492422174> Check this: ${message.content}`);
  }
});

// Login using token stored in Railway (environment variable)
client.login(process.env.DISCORD_TOKEN);
