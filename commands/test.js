module.exports = {
    name: 'test',
    description: 'Used for test some features.',
    async execute(interaction) {
        const { MessageEmbed, EmbedBuilder } = require('discord.js');

        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`You won the battle!`)
        .addFields(
            { name: `${interaction.user.username}`, value: `Test`, inline: true }
        );
        interaction.reply({ embeds: [embed] });
    },
//     options: [
//         {
//             name: 'max',
//             description: 'max amount',
//             type: 4,
//             required: true
//         },
//         {
//             name: 'current',
//             description: 'current amount',
//             type: 4,
//             required: true
//         }
//     ]
}
