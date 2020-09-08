const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const fs = require('fs');
var optedIn = {};

async function getRandomIDFromMessage(message) {
    try {
        var members = await message.guild.members.fetch();
        let userIDs = members.keyArray();
        var randomID = userIDs[Math.floor(Math.random() * userIDs.length)];
        return randomID;
    } catch (e) {
        console.log("oof" + e);
    }
}

/**
 * @param {message} message - The message object
 * @param {boolean} actuallyMention - 1 actually mentions the user, 0 prints their ID
 */
function atSomeoneMessage(message, actuallyMention) {
    console.log("At someone detected! Will actually mention them: " + actuallyMention);
    if (actuallyMention) {
        getRandomIDFromMessage(message).then(randomID =>
            message.channel.send("<@" + (randomID) + ">")
        );
    } else {
        getRandomIDFromMessage(message).then(randomID =>
            message.channel.send("I'd mention " + randomID + " but that'd be annoying, wouldn't it?")
        );
    }
}

// This is a rough approximation of what the function *should* do
// One day it'll open a file, make a few changes to it, and close it again so it at least survives the bot being shut down
function optSomeoneIn(guildID, authorID) {
    for (i = 0; i < optedIn.length; i++) {
        if (optedIn[i][0] == guildID) {
            // Find the authorID in the array. If it's not there, put it in. If it is, remove it.
            let authorIDIndex = optedIn[i][1].indexOf(authorID);
            if (authorIDIndex != -1) {
                optedIn[i][1].push(authorID);
                return "Opted in!";
            } else {
                delete optedIn[i][1][authorIDIndex];
                return "Opted out!";
            }

        }
    }
    optedIn.push([guildID, [authorID]]);
    return "Server added and opted in!";
}

client.once('ready', () => {
    console.log('Ready!');
    // todo: load the opt-in json and keep it as an array
});

client.login(auth.token);

//TODO: make it run when mentioned, not when a message contains @someone
client.on("message", message => {
    if (message.content.includes("@someone-everyone")) {
        try {
            atSomeoneMessage(message, false);
        } catch (error) {
            console.log(error);
        }
    } else if (message.content.includes("@someone-optin")) {
        try {
            optSomeoneIn(message.guild.id, message.author.id);
            console.log(optedIn);
        } catch (error) {
            console.log(error);
        }
    } else if (message.content.includes("@someone")) {
        // Look up the list of those who've either opted in or not opted out and mention one at random
    }
});
