module.exports = {
    name: 'test',
    description: 'Test',
    async execute(interaction) {
        const { EmbedBuilder } = require('discord.js');
        var { renderMines, addPos } = require('../mines/renderMines')
        var { loadGame, saveGame,generateMines, openField } = require('../mines/mines')

        let x = interaction.options.get('x').value;
        let y = interaction.options.get('y').value;

        var field = generateMines(125239132, 10, 10, 5);
        var open = openField(field.state, field.fore, x, y)

        var fieldStr = renderMines(open.fore);

        // const embed = new EmbedBuilder();
        // embed.setTitle("You runned away!");
        // embed.setColor("#0099ff");
        // embed.setDescription("```\n" + addPos(fieldStr) + "\n```")
        // embed.setTimestamp();
        // interaction.reply({ embeds: [embed] });

        interaction.reply("```\n" + addPos(fieldStr) + "\n```");
    },
    options: [
        {
            name: 'x',
            description: 'X axis position.',
            type: 4,
            required: true
        },
        {
            name: 'y',
            description: 'Y axis position.',
            type: 4,
            required: true
        }
    ]
}
