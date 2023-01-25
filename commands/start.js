module.exports = {
    name: 'test',
    description: 'Used for test some features.',
    async execute(interaction) {
        const { MessageEmbed, EmbedBuilder } = require('discord.js');
        var { loadGame, saveGame, openField, generateMines } = require('../mines/mines')
        var { renderMines, addPos } = require('../mines/renderMines')
        


        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`You won the battle!`)
        .addFields(
            { name: `${interaction.user.username}`, value: `Test`, inline: true }
        );
        interaction.reply({ embeds: [embed] });
    },
    options: [
        {
            name: 'seed',
            description: 'Numeric seed for new game.',
            type: 4,
            required: true
        }
    ]
}
