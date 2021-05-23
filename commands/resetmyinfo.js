let userModel = require('../Database/users');
let resetmyinfoCmd = {
  name: 'resetmyinfo',
  description: 'we can reset personal info using this command',
  async execute(message, args) {
    //here modify the personal info
    let username = message.author.username;
    personalInfo = ['state', 'district', 'age'];

    const filter = (m) => m.author.id == message.author.id;

    //asking which personal info that user wants to change
    message.channel.send(
      'Which personal info you want to edit ?\n It should be one amoung these.\n ***state***\n ***district***\n ***age***'
    );
    const q0ans = await message.channel.awaitMessages(filter, { time: 15000 });
    if (q0ans.size == 0) {
      message.channel.send('profile reset is unsuccesfull');
      return;
    }
    let infoToChange = q0ans.first().content.toLowerCase();
    if (!personalInfo.includes(infoToChange)) {
      message.channel.send('Error! Its not in the given personal info list');
      return;
    }

    //asking which user to send value which they want to edit
    message.channel.send('send the the new personal Info value');
    const q1ans = await message.channel.awaitMessages(filter, { time: 15000 });
    if (q1ans.size == 0) {
      message.channel.send('profile reset is unsuccesfull');
      return;
    }
    let newPersonalInfoVal = q1ans.first().content;

    try {
      userDoc = await userModel.findOne({ name: username }).exec();
      userDoc[infoToChange] = newPersonalInfoVal;
      modifiedUserInfo = await userModel
        .findOneAndUpdate({ name: username }, userDoc)
        .exec();
      message.channel.send(`${infoToChange} is updated`);
    } catch (error) {
      message.channel.send('error while resetting profile');
    }
  },
};

module.exports = resetmyinfoCmd;
