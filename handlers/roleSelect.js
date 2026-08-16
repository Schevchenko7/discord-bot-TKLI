const roles = require('../config/roles.json');

module.exports = async function handleRoleSelect(interaction) {
  const guild = interaction.guild;
  const member = interaction.member;
  const dipilih = interaction.values; // array roleName yang dicentang user

  await interaction.deferReply({ ephemeral: true });

  const ditambah = [];
  const dihapus = [];

  for (const roleConfig of roles) {
    let role = guild.roles.cache.find((r) => r.name === roleConfig.roleName);

    // Auto-create role kalau belum ada di server
    if (!role) {
      role = await guild.roles.create({
        name: roleConfig.roleName,
        reason: 'Auto-created oleh role selector bot',
      });
    }

    const dicentang = dipilih.includes(roleConfig.roleName);
    const sudahPunya = member.roles.cache.has(role.id);

    if (dicentang && !sudahPunya) {
      await member.roles.add(role);
      ditambah.push(role.name);
    } else if (!dicentang && sudahPunya) {
      await member.roles.remove(role);
      dihapus.push(role.name);
    }
  }

  let balasan = '';
  if (ditambah.length) balasan += `✅ Role ditambahkan: ${ditambah.join(', ')}\n`;
  if (dihapus.length) balasan += `❌ Role dihapus: ${dihapus.join(', ')}`;
  if (!balasan) balasan = 'Tidak ada perubahan role.';

  await interaction.editReply({ content: balasan });
};
