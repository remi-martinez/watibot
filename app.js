const { Client, GatewayIntentBits, Events, Collection, EmbedBuilder, REST, Routes } = require('discord.js');
const Utils = require('./utils');
const dotenv = require('dotenv').config();

const CLIENT_KEY = process.env.CLIENT_KEY;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Register slash commands
const commands = [
    {
        name: 'bg',
        description: 'Le bot te salue!'
    },
    {
        name: 'wati',
        description: 'Cherche quelque chose avec Wati',
        options: [
            {
                name: 'recherche',
                type: 3, // STRING type
                description: 'Ce que tu veux chercher',
                required: true
            }
        ]
    }
];

client.once(Events.ClientReady, async () => {
    console.log("Mon WatiBOT est Connecté !");
    client.user.setActivity("Regarde les clips de Maitre Gims", { type: 3 }); // type 3 = WATCHING
    
    // Register slash commands
    const rest = new REST({ version: '10' }).setToken(CLIENT_KEY);
    
    try {
        console.log('Enregistrement des commandes slash...');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
        
        console.log('Commandes slash enregistrées avec succès!');
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement des commandes:', error);
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'bg') {
        await interaction.reply(`Bien ou quoi ${interaction.user.toString()}`);
    }

    if (commandName === 'wati') {
        const recherche = interaction.options.getString('recherche');
        
        await interaction.deferReply();
        
        try {
            const embed = await Utils.watiCherche(recherche, interaction);
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la recherche Wati:', error);
            await interaction.editReply('Une erreur est survenue lors de la recherche.');
        }
    }
});

client.on(Events.Error, error => {
    console.error('Erreur du client Discord:', error);
});

client.login(CLIENT_KEY);