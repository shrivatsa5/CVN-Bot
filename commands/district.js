const User = require('../Database/users');
const StateDistrict = require('../Database/states');
const got = require('got');

let dstCmd = {
  name: 'district',
  description:
    'get planned vaccination sessions on a specific date in a given district.',
  async execute(message, args) {
    try {
      const user_name = message.author.username;
      let document = await User.findOne({ name: user_name });
      console.log(document);

      if (!document) message.reply('Not registered. Kindly register');
      else {
        const user_state_name = document.state.toLowerCase();
        const user_district_name = document.district.toLowerCase();
        let state_document = await StateDistrict.findOne({
          state_name: user_state_name,
          district_name: user_district_name,
        });
        let district_id, st_id;
        if (!state_document) {
          let response = await got(
            'https://cdn-api.co-vin.in/api/v2/admin/location/states'
          );
          response = JSON.parse(response.body);
          response.states.forEach((element) => {
            if (element.state_name.toLowerCase() == user_state_name)
              st_id = element.state_id;
          });

          const url =
            'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' +
            st_id.toString();
          let dist_res = await got(url);
          dist_res = JSON.parse(dist_res.body);

          dist_res.districts.forEach(async (element) => {
            if (element.district_name.toLowerCase() === user_district_name)
              district_id = element.district_id;
            const stateDistrict = new StateDistrict({
              state_name: user_state_name,
              state_id: st_id,
              district_name: element.district_name,
              district_id: element.district_id,
            });
            await stateDistrict.save();
          });
        } else {
          district_id = state_document.district_id;
        }
        let query_date = '';

        if (!args[0]) {
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth() + 1).padStart(2, '0');
          let yyyy = today.getFullYear();
          today = dd + '-' + mm + '-' + yyyy;
          query_date = today;
        } else query_date = args[0];

        let Url =
          'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=<DiD>&date=' +
          query_date;
        Url = Url.replace('<DiD>', district_id.toString());
        console.log(Url);
        let res = await got(Url);
        res = JSON.parse(res.body);
        if (res.sessions.length == 0) message.channel.send('No slots found');

        res.sessions.forEach(async (element) => {
          msg = {
            Name: element.name,
            Vaccine: element.vaccine,
            Slots: element.slots,
          };
          message.channel.send(JSON.stringify(msg));
        });
      }
    } catch (error) {
      console.log(error);
      message.channel.send('Something went wrong.Please try again');
    }
  },
};

module.exports = dstCmd;
