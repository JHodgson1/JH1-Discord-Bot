const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});

global.roles = 
{
    "sahpdept" : "367796502824878080",
    "sahpfto" : "354074444265947147",
    "sahpsrank" : "354067549970890767",
    "sahphighc" : "405444705560559618",

    "lspddept" : "500799280974397463",
    "lspdfto" : "505550111099584512",
    "lspdsrank" : "500800444616933406",
    "lspdhighc" : "500799280974397463",

    "lssddept" : "367796714586898433",
    "lssdfto" : "354074456940871681",
    "lssdsrank" : "354074458618855444",
    "lssdhighc" : "367796714586898433",

    "safddept" : "367796857272926218",
    "safdfto" : "354087776259538954",
    "safdsrank" : "354086496996818946",
    "safdhighc" : "405456643497918464"


}

// const errorchannel = member.guild.channels.find('name', 'jcrp-logs')
bot.commands = new Discord.Collection(); 

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Could not file coomads.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});


// Displays the message in console
bot.on("ready", async () => {
    
    bot.user.setPresence({
        data: {
            game: {
                name: "JusticeCommunityRP | jcrpweb.com"
            },
            status: "dnd"
        }
    })
    console.log(`Bot online and currently serving in ${bot.channels.size} channels on ${bot.guilds.size} servers, for a total of ${bot.users.size} users.`)

});

bot.on("guildCreate", guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

bot.on("guildDelete", guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

// Bot Start
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

    if(cmd === `${prefix}civdiscord`) {
        let firstmention = message.mentions.users.first()
        message.delete().catch(O_o => {})
        if (firstmention) 
        {
            message.channel.send(firstmention + ', here is a permanent invite to the civilian operations Discord: https://discord.gg/nWaukXd')
        }
        else
        message.channel.send('Here is a permanent invite to the civilian operations Discord: https://discord.gg/nWaukXd')
        
    }


// After verification
    if(messageArray === `?reg`){
        let postVeri = message.guild.channels.find(`name`, "jcrp-off_topic");
        return postVeri.channel.send("Welcome.");
    }
});

bot.login(botconfig.token);