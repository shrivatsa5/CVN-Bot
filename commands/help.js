let helpCmd={
    name: 'help',
  description:
    'get description of all commands',
  async execute(message, args) {
      try{
          
          let cmd=args[0]
          let msg;
          switch(cmd){
              case("pincode"):
              msg="get planned vaccination sessions on a specific date in a given pin. Enter $pincode command"
              break
              case("district"):
              msg="get planned vaccination sessions on a specific date in a given district. If you need today's information enter $district,else enter $district and then date separated by space."             
              break
             case("register"):
             msg="Register to our service by providing basic details. Enter $register to begin"
             break
            
             case("subscribe"):
             msg="Subscribe to our hourly update service. Enter $subscribe to begin."
             break

             case("resetmyinfo"):
             msg="Reset your district or state name. Enter $resetmyinfo command."
             break

             default:
                 "Stay safe"              
          }
          message.channel.send(msg)
      }
      catch(err){
          console.log(err)
          message.channel.send("Something went wrong. Please try again")
      }
  }

}
module.exports=helpCmd
