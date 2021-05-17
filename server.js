const fs = require('fs');
require('dotenv').config('./env');
//Database configured and connected
require('./Database/dbconfig');

const Discord = require('discord.js');
let bot = new Discord.Client();
bot.commands = new Discord.Collection();

//Getting essential environment variables;
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

//reading all the command files of command folder and registering each command
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.on('message', (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) {
    return;
  }

  const args = message.content.slice(PREFIX.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command)) {
    message.reply('Command not found !');
    return;
  }

  try {
    bot.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
  return;
});

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.login(TOKEN);
