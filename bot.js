const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

async function getRandomIDFromMessage(message) {
    try {
        var members = await message.guild.members.fetch();
        let userIDs = members.keyArray();
        var randomID = userIDs[Math.floor(Math.random()*userIDs.length)];
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
        getRandomIDFromMessage(message).then( randomID => 
            message.channel.send("<@"+(randomID)+">")
        );
    } else {
        getRandomIDFromMessage(message).then( randomID => 
            message.channel.send("I'd mention " + randomID + " but that'd be annoying, wouldn't it?")
        );
    }
}

client.once('ready', () => {
	console.log('Ready!');
});

client.login(auth.token);

//TODO: make it run when mentioned, not when a message contains @someone
client.on("message", message => {
    if (message.content.includes("@someone")) {
        try {
            atSomeoneMessage(message, false);
        } catch (error) {
            console.log(error);
        }
    }
});
