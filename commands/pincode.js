const User = require('../Database/users');
const got = require('got');

let pincode_cmd = {
  name: 'pincode',
  description:
    'get planned vaccination sessions on a specific date in a given pin',
  async execute(message, args) {
    let name = message.author.username;
    const filter = (m) => m.author.id == message.author.id;
    let docs=await User.findOne({name:name})
    let user_age=docs.age
    let pinCode;
    if(docs.pincode!="")pinCode=docs.pincode
    else{
    
    message.channel.send('Enter your  pincode');
    const q0ans = await message.channel.awaitMessages(filter, { time: 15000 });
    console.log(q0ans.size);
    if (q0ans.size == 0) {
      message.channel.send('Time exceeded!! You have start again');
      return;
    }
     pinCode = q0ans.first().content;
     
  }

    message.channel.send('Enter date (dd-mm-yyyy) ');
    const q1ans = await message.channel.awaitMessages(filter, { time: 15000 });
    if (q1ans.size == 0) {
      message.channel.send('enter date');
      return;
    }
    let date = q1ans.first().content;
    try {
      const url =
        'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' +
        pinCode +
        '&date=' +
        date;

      let response = await got(url);
      response = JSON.parse(response.body);

      if (response.sessions.length == 0)
        message.channel.send('No slots available');
      else {
        response.sessions.forEach(async (element) => {
          if(element.min_age_limit<=user_age){
            message.channel.send(
             
            "\n"+"\n"+
            "***Name***"+"\t"+"     "+":"+"\t"+ element.name +"\n"
             +
           "***Vaccine***"+"\t" +" "+":"+"\t"+ element.vaccine +"\n"
              +
           "***Slots***" +"\t"+"       "+":"+"\t"+ element.slots + "\n" )
             
          }
        });
      }
    } catch (err) {
      console.log(err);
      message.channel.send('Something Went Wrong.Please try again....');
    }
  },
};

module.exports = pincode_cmd;
