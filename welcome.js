module.exports = (bot) => {
    const channelId = '843394010013106189' // welcome channel
    const targetChannelId = '845697294980612126' // rules and info
  
    bot.on('guildMemberAdd', (member) => {
      member.send(
        "***WELCOME TO CVN-BOT***" +"\n"+        
        "These are the commands  you can use:"+"\n"+
      "***$register***" +"\n"+
      "***$resetmyinfo***" +"\n"+
      "***$district***"+"\n"+
      "***$pincode***" +"\n"+
      "***$subscribe***" +"\n"+
      "For any help regarding the commands, enter  $help followed by the command name separated by space."+"\n"
      +"\n"
      +"\n"
      +"***STAY HOME STAY SAFE***")
    })
  }