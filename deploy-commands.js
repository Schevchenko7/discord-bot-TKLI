// Jalankan file ini SEKALI setiap kali kamu menambah/mengubah slash command
// Cara pakai: npm run deploy

require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('setup-roles')
    .setDescription('Kirim pesan pemilihan role ke channel ini (khusus admin)')
    .setDefaultMemberPermissions(0x8) // hanya Administrator yang bisa pakai
    .toJSON(),

  new SlashCommandBuilder()
    .setName('ping-event')
    .setDescription('Umumkan event dan ping role tertentu')
    .addStringOption((opt) =>
      opt.setName('nama').setDescription('Nama event').setRequired(true)
    )
    .addRoleOption((opt) =>
      opt.setName('role').setDescription('Role yang akan di-ping').setRequired(true)
    )
    .addStringOption((opt) =>
      opt
        .setName('pesan')
        .setDescription('Pesan tambahan untuk event (opsional)')
        .setRequired(false)
    )
    .addStringOption((opt) =>
      opt
        .setName('waktu')
        .setDescription('Jadwalkan di waktu tertentu, format: YYYY-MM-DD HH:mm (kosongkan untuk kirim langsung)')
        .setRequired(false)
    )
    .toJSON(),
];

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Mendaftarkan slash command...');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('✅ Slash command berhasil didaftarkan!');
  } catch (error) {
    console.error('❌ Gagal mendaftarkan command:', error);
  }
})();
