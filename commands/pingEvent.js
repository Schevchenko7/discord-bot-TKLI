const { EmbedBuilder } = require('discord.js');
const schedule = require('node-schedule');

module.exports = {
  name: 'ping-event',

  async execute(interaction) {
    const nama = interaction.options.getString('nama');
    const role = interaction.options.getRole('role');
    const pesan = interaction.options.getString('pesan') || 'Event akan segera dimulai, jangan sampai ketinggalan!';
    const waktu = interaction.options.getString('waktu');

    const buatEmbed = () =>
      new EmbedBuilder()
        .setTitle(`📢 Event: ${nama}`)
        .setDescription(pesan)
        .setColor(0xffa500)
        .setTimestamp();

    // Kalau parameter waktu tidak diisi -> kirim ping langsung sekarang
    if (!waktu) {
      await interaction.reply({
        content: `${role}`,
        embeds: [buatEmbed()],
      });
      return;
    }

    // Kalau diisi -> validasi format waktu lalu jadwalkan
    const targetDate = new Date(waktu.replace(' ', 'T'));

    if (isNaN(targetDate.getTime()) || targetDate < new Date()) {
      await interaction.reply({
        content: '⚠️ Format waktu tidak valid atau sudah lewat. Gunakan format: `YYYY-MM-DD HH:mm` (contoh: 2026-08-20 19:00)',
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: `✅ Event **${nama}** dijadwalkan, ${role} akan di-ping otomatis pada ${targetDate.toLocaleString('id-ID')}.`,
      ephemeral: true,
    });

    // node-schedule akan otomatis kirim pesan ini saat waktunya tiba
    schedule.scheduleJob(targetDate, async () => {
      try {
        await interaction.channel.send({
          content: `${role}`,
          embeds: [buatEmbed()],
        });
      } catch (err) {
        console.error('Gagal mengirim ping event terjadwal:', err);
      }
    });
  },
};
