const Discord = require('discord.js');
const Utils = require('./utils');
const client = new Discord.Client();
const dotenv = require('dotenv').config()

const CLIENT_KEY = process.env.CLIENT_KEY;
const prefix = "/";

client.on("ready", () => {
    client.user.setActivity("les clips de Maitre Gims", { type: "WATCHING"}) // pour le statut du bot 
    console.log("Mon WatiBOT est Connecté !"); //
})

// Message callback function

client.on("message", async function (message) {

    if (message.author.bot) return;

    // MESSAGES SANS PREFIXE

    if (message.content === "Salut") { // Lorsque "Salut" est envoyé
        message.channel.send("Salut mon Wati-pote!")
        message.channel.send("https://tenor.com/view/vianney-ma%C3%AEtre-gims-danse-gif-11679190")
    }
    if (message.content.toLowerCase() === "bonne journée" || message.content.toLowerCase() === "bonne journee"){
        message.channel.send("https://tenor.com/view/yass-gif-20014661")
        message.channel.send("Passe une bonne journée mon Wati-frérot !")
    }

    if (!message.content.startsWith(prefix) && message.content.toLowerCase().includes("wati")) {
        const pos = message.content.search("wati");
        const srch = message.content.toLowerCase().substring(pos + 4);

        let embed = await Utils.watiCherche(srch, message)
        message.channel.send(embed)
    }

    if (!message.content.startsWith(prefix)) return;

    // MESSAGES AVEC PREFIXE

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const command2 = args.splice(1,1).shift();

    if (command === "bg") {
    message.channel.send("Bien ou quoi " + message.author.toString())                
    }
});

client.login(CLIENT_KEY);