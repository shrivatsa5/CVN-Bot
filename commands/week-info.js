const got = require("got");
const User=require("../Database/users")

let week_cmd={
    name: 'week-info',
  description: 'get planned vaccination sessions for 7 days from a specific date in a given pin',
  async execute(message, args){
    try{
      let today = new Date();        
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); 
      let yyyy = today.getFullYear();        
      today = dd + '-' + mm + '-' + yyyy;
      let pinCode 
      
      let doc=await User.findOne({name:message.author.username})
      let user_age=doc.age
      if(doc.pincode==="")
      {
        console.log("here")
        const filter = (m) => m.author.id == message.author.id;
            message.channel.send('Enter your  pincode');
            const q0ans = await message.channel.awaitMessages(filter, { time: 10000 });
            console.log(q0ans.size)
             if (q0ans.size == 0) {
            message.channel.send('Re-enter the command and try again');
            return;
          }
          pinCode = q0ans.first().content;

      }
      else
       pinCode=doc.pincode
      console.log(pinCode)
      const url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pinCode+"&date="+today
      console.log(url)
      let response=await got(url)
      response=JSON.parse(response.body)
      console.log(response.centers.length)
      
      //console.log(typeof(response.centers.sessions))
      if(response.centers.length==0)  message.channel.send("No slots available")
      else{
        for (var j = 0; j < response.centers.length; j++){

          console.log(response.centers[j]);
          
          }


      }
      


    }
    catch(err){
      console.log(err)
      message.channel.send("Something went wrong. Please try again later")
    }
  }



}
module.exports=week_cmd