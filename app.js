const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config()
const client = new Discord.Client();

const CLIENT_KEY = process.env.CLIENT_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_SEARCH_ENGINE = process.env.GOOGLE_SEARCH_ENGINE;

const prefix = "/";
const phrases = ['Trop bien', 'Mate moi', 'Vise un peu', 'Il est pas COOL', 'Mec c\'est vraiment incroyable', 'Un max de fun', 'Pas croyable'];
const errorImageLink = 'https://i.imgur.com/LOo7hhg.png';



client.on("ready", () => {
    client.user.setActivity("les clips de Maitre Gims", { type: "WATCHING"}) // pour le statut du bot 
    console.log("Mon WatiBOT est Connecté !"); //
})

async function waticherche(search, message) {
    const googleEndpoint = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE}&searchType=image&q=${search}`;

    try {
        const { items } = await fetch(googleEndpoint).then(response => response.json());
        if(!items) {
            throw new Error();
        }

        const imgLink = items[0].link;
        const searchFormated = search.substring(1);

        const imageProcessEndpoint = "http://wtfapi.rego-workspace.fr/?img=" + imgLink;
        const newImage = await fetch(imageProcessEndpoint).then(response => response);

        let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        let fullPhrase = `${randomPhrase} ${await pronomGenre(searchFormated.split(" ")[0])} wati-${searchFormated} !`;

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setDescription('**' + fullPhrase + '**')
            .setImage(newImage.url);

        return embed;

    } catch(error) {

        const embed = new Discord.MessageEmbed()
            .setColor('#ff3014')
            .setDescription('Y\'a un wati-pépin avec ta recherche 😮')
            .setImage(errorImageLink)

        return embed;
    }
}

async function pronomGenre(search) {
    try {
        const dictionnaryEndpoint = "https://api.dictionaryapi.dev/api/v2/entries/fr/" + search
        const result = await fetch(dictionnaryEndpoint).then(response => response.json());
        if(result && result[0] && result[0].meanings && result[0].meanings[0] && result[0].meanings[0].partOfSpeech) {
            const genre = result[0].meanings[0].partOfSpeech;
            return (genre == "nom féminin") ? "cette" : "ce"
        } else {
            return "ce";
        }
    } catch(error) {
        return "ce";
    }
}  

// Répondre à un message
client.on("message", async function (message) {

    if (message.author.bot) return;

    

    
    // MESSAGES SANS PREFIXE

    if (message.content === "Salut") { // Lorsque "Salut" est envoyé
        message.channel.send("Salut mon Wati-pote!")
        message.channel.send("https://tenor.com/view/vianney-ma%C3%AEtre-gims-danse-gif-11679190")
    }
    if (message.content === "bonne journée" | message.content === "bonne journee"){
        message.channel.send("https://tenor.com/view/yass-gif-20014661")
        message.channel.send("Passe une bonne journée mon Wati-frérot !")
    }

    if (!message.content.startsWith(prefix) && message.content.toLowerCase().includes("wati")) {
        const pos = message.content.search("wati");
        const srch = message.content.toLowerCase().substring(pos + 4);

        let embed = await waticherche(srch, message)
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