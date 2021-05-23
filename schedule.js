const User = require('./Database/users');
var cron = require('node-cron');
const got = require('got');
const bot = require('./server');

cron.schedule('*/60 * * * *', async () => {
  try {
    //getting todays date and converting it to specified format
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;

    let pincode_set = new Set();

    let document = await User.find({});
    document.forEach((element) => {
      //search for users with pincode and store all unique pincodes
      if (element.pincode != '') pincode_set.add(element.pincode);
    });

    let items = Array.from(pincode_set);

    let pincode_arr = [];
    if (items.length < 100) {
      items.forEach((element) => {
        pincode_arr.push(element);
      });
    } else {
      let range = 100;
      let itemsDuplicate = items;
      for (var i = 0; i < range; i++) {
        //pincode_arr[]->randomly choosen pincodes
        const x =
          itemsDuplicate[Math.floor(Math.random() * itemsDuplicate.length)];
        pincode_arr.push(x);

        //deleting x element
        let index = itemsDuplicate.indexOf(x);
        if (~index) {
          itemsDuplicate.splice(index, 1);
        }

        pincode_arr;
      }
    }
    var subscribers_arr = [];
    for (let pincode of pincode_arr) {
      const url =
        'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' +
        pincode +
        '&date=' +
        today;
      let res = await got(url);
      res = JSON.parse(res.body);
      if (res.sessions.length != 0) {
        let usersWithGivenPincode = await User.find({ pincode: pincode });
        usersWithGivenPincode.forEach((user) => {
          subscribers_arr.push([user, res.sessions]); // have to add response object
        });
      }
    }

    const collectInfo = (infoArr) => {
      let infoStr = String('***solts are available hurray***');
      let importantProp = ['name', 'address', 'date','vaccine'];
      infoArr.forEach((infoObj) => {
        // importantPropObject = {};
        for (let prop in infoObj) {
          if (!importantProp.includes(prop)) {
            // importantPropObject[prop] = infoObj[prop];
            delete infoObj[prop];
          }
        }
        console.log(infoObj);
        infoStr += '\n';
        infoStr += "***Name***"+"     "+":"+"\t"+infoObj.name +"\n"+"***vaccine***"+"  "+":"+"\t"+infoObj.vaccine+"\n";
      });
      return infoStr;
    };
    for (userHourlyInfo of subscribers_arr) {
      userDmChannel = await bot.users.fetch(userHourlyInfo[0].userid, false);
      userDmChannel.send(collectInfo(userHourlyInfo[1]));
      userDmChannel.send("Follow this link and book your slot" +"\n"+"https://www.cowin.gov.in/home")
    }
  } catch (err) {
    console.log(err);
    console.log('error in schedule.js');
  }
});