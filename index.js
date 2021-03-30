const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json');
const prefix = config.prefix;
bot.commands = new Discord.Collection();
const fs = require('fs');
const token = config.token;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
let listOfInsults = ["shut up you useless subhuman filth", "everytime you say somebody leveled up i become one step closer to a hate crime that includes you",
"i'm going to level with you, nobody cares", "i'm going to level your ass to kingdom come if you dont shut the hell up", "shut shut shut shut shut shut shut",
"stop it stop it stop it among us among us among us st", "i hope you step on legos", "die so you can finally provide something useful to society"]
bot.login(token);
console.log(bot.user);

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}
const listOfCommands = bot.commands;
bot.on('ready',()=>{
    console.log("bot ready");
    bot.user.setAvatar('./arcanepic.jpg');
})
bot.on('guildCreate', guild => {
    guild.systemChannel.send(`Hi, I was created to specifically to insult Arcane. Whenever Arcane says anything, I reply with an insult.`, {
      embed:{
          title: 'Prefix',
          color: 0x2471a3, 
          description: "The prefix for all my commands is \'$', like \'$help\'.",
          fields:[
              {
                  name: 'Commands',
                  value: 'help, arcane'
              },

          ],
          footer: {
              text: 'Yes this took time. Yes i spent time making this. Yes I have brain damage. (btw i havent pushed this to a dedicated server/hosting service, so this bot wont be active 24/7 for a bit. rn it is only on if my laptop is running the code)'
          }
      }
    });
  });
bot.on('message',(message)=>{
    //message.reply(message.author.tag);
    if(message.author.tag == "Arcane#7800"){
        message.reply(listOfInsults[Math.round(Math.random()*listOfInsults.length-1)]);
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if(!bot.commands.has(command)){
        message.reply("command not recognized");
    }else{
        bot.commands.get(command).execute(message, args);
    }
})

exports.listOfCommands = listOfCommands;