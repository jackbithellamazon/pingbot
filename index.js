const { Client, GatewayIntentBits } = require("discord.js");

const token = process.env.DISCORD_TOKEN; // <-- from Railway

// --- DEBUG: prove what we actually received ---
if (!token) {
  console.error("❌ ENV DISCORD_TOKEN is missing (empty).");
  process.exit(1);
}
const parts = token.split(".");
const masked =
  token.length > 10
    ? `${token.slice(0, 6)}...${token.slice(-6)} (len ${token.length}, parts ${parts.length})`
    : token;
console.log("🔐 Got DISCORD_TOKEN:", masked);
if (parts.length !== 3) {
  console.error("❌ Token format wrong: Discord bot tokens have 3 dot-separated parts.");
}
// ----------------------------------------------

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  // (we’ll add your channel logic once we’re logged in)
});

client.login(token);
