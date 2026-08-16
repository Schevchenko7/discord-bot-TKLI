const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const roles = require('../config/roles.json');

module.exports = {
  name: 'setup-roles',

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📋 Pilih Role Kamu')
      .setDescription('Gunakan menu di bawah untuk memilih role. Kamu bisa memilih lebih dari satu, atau hapus centang untuk melepas role.')
      .setColor(0x5865f2);

    const menu = new StringSelectMenuBuilder()
      .setCustomId('role-select')
      .setPlaceholder('Pilih role di sini...')
      .setMinValues(0)
      .setMaxValues(roles.length)
      .addOptions(
        roles.map((r) => ({
          label: r.label,
          description: r.description,
          value: r.roleName,
          emoji: r.emoji,
        }))
      );

    const row = new ActionRowBuilder().addComponents(menu);

    // Pesan ini dikirim ke channel (bukan ephemeral) supaya semua member bisa lihat & pakai
    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
