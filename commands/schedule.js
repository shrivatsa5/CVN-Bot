const User=require("../Database/users")
var cron = require('node-cron');
const got = require("got");
const func=async (subscribers_arr, pincode_arr)=>
{
        
         //for every pinocde in pincode_arr, check if available and find all users with that pincode and store in subscribers_arr        
         pincode_arr.forEach(async element=>{
            /*const url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+element+"&date="+today
             const response=await got(url,{json:true})            
            if(response.body.sessions.length!=0)*/
        
             let  docs=await User.find({pincode:element})
             docs.forEach( d=>{
                console.log(d.name)
               subscribers_arr.push(d.name)
                }) 
                              
         }) 

}
       



cron.schedule('*/1 * * * *', async() => {
    try{

        let today = new Date();        
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();        
        today = dd + '-' + mm + '-' + yyyy;

        let pincode_set = new Set()
               
      let document=await User.find({})
     document.forEach( element=>{
         if(element.pincode!="") pincode_set.add(element.pincode)   //search for users with pincode and store all unique pincodes
     })    
        let items = Array.from(pincode_set);
        let pincode_arr=[]       
        if(items.length<100)
        {
                items.forEach(element=>{pincode_arr.push(element)})
        }
        else
        {   let range=100   
        for ( var i=0;i<range;i++)
        {           
           const x= (items[Math.floor(Math.random() * items.length)])    //pincode_arr[]->randomly choosen pincodes 
           pincode_arr.push(x)
           pincode_arr
        }
        }   
        var subscribers_arr=[]      

         /*for every pinocde in pincode_arr, check if available and find all users with that pincode and store in subscribers_arr        
         pincode_arr.forEach(async element=>{
            /*const url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+element+"&date="+today
             const response=await got(url,{json:true})            
            if(response.body.sessions.length!=0)
        
             let  docs=await User.find({pincode:element})
             docs.forEach( d=>{
                console.log(d.name)
               subscribers_arr.push(d.name)
                }) 
                              
         }) */
         await func(subscribers_arr,pincode_arr)
         console.log(subscribers_arr.length)        
        // subscribers_arr.forEach(element=>{console.log(element)})    
    }
    catch(err){
        console.log("here")
        console.log(err)
    }
});