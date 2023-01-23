/*
Discord bot
*/
//Dotenv
// Host for replit
const express = require('express');
const app = express();


const path = require('path');
require('dotenv').config();
const { Client, Routes, InteractionType } = require('discord.js');
const { REST } = require('@discordjs/rest');

const CLIENT_ID =  process.env.CLIENT_ID;
const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
    intents: [
        "GuildMembers",
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
    ],
});

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
client.on('ready', () => {console.log(`Logged in as ${client.user.tag}!`);});

function commandDataReader(){
    // Read each file in the commands folder
    const fs = require('fs');
    const commandFiles = fs.readdirSync(
        path.join(__dirname, 'commands')
    ).filter(file => file.endsWith('.js'));
    const commandsData = [];
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commandsData.push(command);
    }
    return commandsData;
}

function commandReader(){
    // Read each file in the commands folder
    // But get only the name and description
    const fs = require('fs');
    const commandFiles = fs.readdirSync(
        path.join(__dirname, 'commands')
    ).filter(file => file.endsWith('.js'));
    const commandsData = [];
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commandsData.push({
            name: command.name,
            description: command.description,
            options: command.options
        });
    }
    return commandsData;
}


const commandsData = commandDataReader();


// Command handler
client.on('interactionCreate', async Interaction => {
    if (!Interaction.isCommand()) return;
    const { commandName } = Interaction;
    
    for (const command of commandsData) {
        if (command.name === commandName) {
            try {
                await command.execute(Interaction);
            } catch (error) {
                console.error(error);
                await Interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
});

async function main(){
    try {
        console.log('Started refreshing application (/) commands.');

        const commands = commandDataReader();

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            {
                body: commands,
            }
        );

        console.log('Successfully reloaded application (/) commands.');

        client.login(TOKEN);
    } catch (error) {
        console.error(error);
    }
}

main();


// // Server for replit

app.listen(3000, () => {
    console.log('Listening on port 3000');
    console.log('server started');
});