const Discord = require('discord.js');
const client = new Discord.Client();

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

client.once('ready', () => {
	console.log('Ready!');
});

client.login('NzQzNTQzOTUyMjAzOTcyNjI5.XzWNRA.NRQE8tIrEK3CJb11ilk0TOzBqeY');

client.on("message", message => {
    if (message.content.includes("@someone")) {
        try {
            console.log(message);
            console.log("At someone detected!");
            getRandomIDFromMessage(message).then( randomID => 
                message.channel.send("<@"+(randomID)+">")
            );
            console.log(randomID);
        } catch (error) {
            console.log(error);
        }
    }
});