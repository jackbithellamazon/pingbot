const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Load token from Railway env vars
const token = process.env.DISCORD_TOKEN;

// Debug logging - this will help identify the issue
console.log("🔍 Debug Info:");
console.log(`Token exists: ${!!token}`);
console.log(`Token length: ${token ? token.length : 0}`);
console.log(`First 10 chars: ${token ? token.substring(0, 10) : 'N/A'}`);
console.log(`Last 10 chars: ${token ? token.substring(token.length - 10) : 'N/A'}`);

if (token) {
  const parts = token.split(".");
  console.log(`Token parts (should be 3): ${parts.length}`);
  
  // Check for common issues
  if (token.startsWith('"') && token.endsWith('"')) {
    console.log("❌ ERROR: Token has quotes around it!");
  }
  if (token.includes(' ')) {
    console.log("❌ ERROR: Token contains spaces!");
  }
  if (parts.length !== 3) {
    console.log("❌ ERROR: Token doesn't have 3 parts separated by dots!");
  }
} else {
  console.log("❌ ERROR: No token found in environment variables!");
}

client.once("ready", () => {
  console.log(`✅ Bot successfully logged in as ${client.user.tag}`);
});

client.on('error', (error) => {
  console.error('❌ Client error:', error);
});

// Add error handling for login
client.login(token).catch(error => {
  console.error('❌ Login failed:', error.message);
  console.error('Code:', error.code);
  
  if (error.code === 'TokenInvalid') {
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Reset your bot token in Discord Developer Portal');
    console.log('2. Copy the NEW token');
    console.log('3. Update Railway environment variable (Raw Editor)');
    console.log('4. Make sure no quotes or extra characters');
    console.log('5. Redeploy');
  }
});
