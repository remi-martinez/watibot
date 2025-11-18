const Discord = require('discord.js');
const { EmbedBuilder } = Discord;
const dotenv = require('dotenv').config();
const genderDatabase = require('./lexique.json');


const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_SEARCH_ENGINE = process.env.GOOGLE_SEARCH_ENGINE;

const phrases = [
    'Trop bien', 
    'Mate moi', 
    'Vise un peu', 
    'C\'est pas COOL', 
    'Mec c\'est vraiment incroyable', 
    'Un max de fun', 
    'Pas croyable',
    'Ooh bella ! Regarde'
];

const errorImageLink = 'https://i.imgur.com/LOo7hhg.png';

var watiCherche = async function(search, message) {
    const googleEndpoint = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE}&searchType=image&q=${search}`;

    try {
        const response = await fetch(googleEndpoint);
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
            throw new Error('Aucun résultat trouvé');
        }

        const imgLink = data.items[0].link;
        let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        let fullPhrase = `${randomPhrase} ${await pronomGenre(search)} wati-${search} !`;

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription('**' + fullPhrase + '**')
            .setImage(imgLink);

        return embed;

    } catch(error) {
        console.error('Erreur dans watiCherche:', error);

        const embed = new EmbedBuilder()
            .setColor('#ff3014')
            .setDescription('Y\'a un wati-pépin avec ta recherche 😮')
            .setImage(errorImageLink);

        return embed;
    }
}

var pronomGenre = async function(search) {
     if (!search) return "ce";

    const firstWord = search
        .toLowerCase()
        .trim()
        .split(/\s+/)[0];

    if (genderDatabase[firstWord]) {
        return genderDatabase[firstWord] === 'f' ? "cette" : "ce";
    }

    return "ce";
}

module.exports = { watiCherche, pronomGenre };