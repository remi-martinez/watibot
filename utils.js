const Discord = require('discord.js');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config()

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_SEARCH_ENGINE = process.env.GOOGLE_SEARCH_ENGINE;

const phrases = ['Trop bien', 'Mate moi', 'Vise un peu', 'C\'est pas COOL', 'Mec c\'est vraiment incroyable', 'Un max de fun', 'Pas croyable'];
const errorImageLink = 'https://i.imgur.com/LOo7hhg.png';

var watiCherche = async function(search, message) {
    const googleEndpoint = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE}&searchType=image&q=${search}`;

    try {
        const { items } = await fetch(googleEndpoint).then(response => response.json());
        if(!items) {
            throw new Error();
        }

        const imgLink = items[0].link;
        const searchFormated = search.substring(1);
        let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        let fullPhrase = `${randomPhrase} ${await pronomGenre(searchFormated.split(" ")[0])} wati-${searchFormated} !`;

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setDescription('**' + fullPhrase + '**')
            .setImage(imgLink);

        return embed;

    } catch(error) {

        const embed = new Discord.MessageEmbed()
            .setColor('#ff3014')
            .setDescription('Y\'a un wati-pépin avec ta recherche 😮')
            .setImage(errorImageLink)

        return embed;
    }
}

var pronomGenre = async function(search) {
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

module.exports = { watiCherche, pronomGenre }