const mongoose=require('mongoose')


const stateDistrictSchema=new mongoose.Schema(
    {
        state_name:{
            type:String
        },
        state_id:{
            type:Number
        },
        district_name:{
            type:String
        },
        district_id:{
            type:Number
        }


        
    }
)

module.exports=mongoose.model("StateDistrict", stateDistrictSchema)