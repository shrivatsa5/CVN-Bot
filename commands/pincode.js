const got = require("got");

let pincode_cmd={
    name: 'pincode',
  description: 'get planned vaccination sessions on a specific date in a given pin',
  async execute(message, args){
    let name = message.author.username;
    const filter = (m) => m.author.id == message.author.id;

    //asking query0 about state

    message.channel.send('Enter your  pincode');
    const q0ans = await message.channel.awaitMessages(filter, { time: 5000 });
    console.log(q0ans.size)
    if (q0ans.size == 0) {
      message.channel.send('enter pincode ');
      return;
    }
    let pinCode = q0ans.first().content;

    message.channel.send('Enter date ');
    const q1ans = await message.channel.awaitMessages(filter, { time: 10000 });
    if (q1ans.size == 0) {
      message.channel.send('enter date');
      return;
    }
    let date = q1ans.first().content;
try{
    const url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+pinCode+"&date="+date
    
    const response=await got(url,{json:true})
    
    if(response.body.sessions.length==0)
    message.channel.send("No slots available")
    else{
      response.body.sessions.forEach(async element=>{
        msg={"Name":element.name, 
        "Vaccine":element.vaccine,           
     "Slots": element.slots,
   }
            
        message.channel.send(JSON.stringify(msg))


      })
    }
}
catch(err){
  console.log(err)
  message.channel.send("Something Went Wrong.Please try again....")
}
  }
}


module.exports=pincode_cmd