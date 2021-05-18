let userModel = require('../Database/users');
let regCmd = {
  name: 'register',
  description: 'we can register to the bot service using this command.',
  async execute(message, args) {
    //here make a database record for the user
    let newUser = new userModel({
      name: message.author.username,
    });
    try {
      let user = await newUser.save();
      console.log('new user saved');
      message.channel.send('profile has been created');
    } catch (error) {
      message.channel.send('error while creating profile');
    }
  },
};

module.exports = regCmd;
