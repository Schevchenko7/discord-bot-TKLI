require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

// Daftarkan semua slash command ke dalam Collection
client.commands = new Collection();
client.commands.set('setup-roles', require('./commands/setupRoles'));
client.commands.set('ping-event', require('./commands/pingEvent'));

const handleRoleSelect = require('./handlers/roleSelect');

client.once('ready', () => {
  console.log(`✅ Bot online sebagai ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  try {
    // Kalau ini adalah slash command (/setup-roles atau /ping-event)
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      await command.execute(interaction);
      return;
    }

    // Kalau ini adalah interaksi dari dropdown pemilihan role
    if (interaction.isStringSelectMenu() && interaction.customId === 'role-select') {
      await handleRoleSelect(interaction);
      return;
    }
  } catch (error) {
    console.error('Terjadi error saat memproses interaksi:', error);

    const pesanError = { content: '⚠️ Terjadi kesalahan saat memproses permintaan kamu.', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(pesanError);
    } else {
      await interaction.reply(pesanError);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
