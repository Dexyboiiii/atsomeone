const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login('NzQzNTQzOTUyMjAzOTcyNjI5.XzWNRA.NRQE8tIrEK3CJb11ilk0TOzBqeY');

client.on("message", message => {
    if (message.content.includes("@someone")) {
        try {
            console.log(message);
            console.log("At someone detected!");
            var currentGuild = message.guild;
            var guildMembers = currentGuild.members.fetch();
            console.log(guildMembers);
            // var randomGuildMember = guildMembers[Math.floor(Math.random() * currentGuild.memberCount)];
            // console.log(randomGuildMember);
        } catch (error) {
            console.log(error);
        }
    }
});