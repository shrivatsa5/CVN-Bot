const User = require('../Database/users');

let notifycmd = {
  name: 'subscribe',
  description: 'subscribe to hourly updates ',

  async execute(message, args) {
    try {
      let name = message.author.username;
      const filter = (m) => m.author.id == message.author.id;

      message.channel.send('Enter your pincode please');
      const q0ans = await message.channel.awaitMessages(filter, {
        time: 10000,
      });
      if (q0ans.size == 0) {
        message.channel.send('Please re-enter command ');
        return;
      }
      message.channel.send('Thank You. You will now receive regular updates');
      let pincode = q0ans.first().content;

      let document = await User.findOneAndUpdate(
        { name: name },
        { pincode: pincode }
      );
    } catch (err) {
      console.log(err);
      message.channel.send('Something went wrong.PLease try again');
    }
  },
};

module.exports = notifycmd;
