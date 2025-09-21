// Minimal Discord.js v14 relay bot
import { Client, GatewayIntentBits, Partials } from "discord.js";

// Token will come from Railway env var: DISCORD_TOKEN
const TOKEN = process.env.DISCORD_TOKEN;

// 🎯 Listen in both of your channels
const CHANNELS = [
  "1413912845724422345", // profitpath 50spm
  "1414172163304591361"  // profitpath high profit
];

// 👤 Staff user to ping
const STAFF_ID = "1123881830492422174";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  try {
    if (msg.author?.id === client.user?.id) return;          // ignore our own messages
    if (!CHANNELS.includes(msg.channelId)) return;            // only those channels
    await msg.channel.send(`Heads up <@${STAFF_ID}>`);        // ping the staff member
  } catch (err) {
    console.error("❌ Send failed:", err?.message || err);
  }
});

client.login(TOKEN);
