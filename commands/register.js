let userModel = require('../Database/users');
let regCmd = {
  name: 'register',
  description: 'we can register to the bot service using this command.',
  async execute(message, args) {
    //here make a database record for the user
    let name = message.author.username;
    const filter = (m) => m.author.id == message.author.id;

    //asking query0 about state
    message.channel.send('Enter your state please');
    const q0ans = await message.channel.awaitMessages(filter, { time: 5000 });
    if (q0ans.size == 0) {
      message.channel.send('profile creation is unsuccesfull');
      return;
    }
    let state = q0ans.first().content.toLowerCase();
    

    //asking query1 about district
    message.channel.send('Enter your district please');
    const q1ans = await message.channel.awaitMessages(filter, { time: 5000 });
    if (q1ans.size == 0) {
      message.channel.send('profile creation is unsuccesfull');
      return;
    }
    let dist = q1ans.first().content.toLowerCase();
    

    //asking query2 about age
    message.channel.send('Enter your age please');
    const q2ans = await message.channel.awaitMessages(filter, { time: 5000 });
    if (q2ans.size == 0) {
      message.channel.send('profile creation is unsuccesfull');
      return;
    }
    let age = parseInt(q2ans.first().content);

    let newUser = new userModel({
      name: name,
      state: state,
      district: dist,
      age: age,
    });
    try {
     
      let user = await newUser.save();
      //console.log(user);
      //console.log('new user saved');
      message.channel.send('profile has been created');
    } catch (error) {
      message.channel.send('error while creating profile');
    }
  },
};

module.exports = regCmd;
