const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        state:{type:String,required:true},
        district:{type:String,required:true},
        age:{type:Number, required:true}

        
    }
)
module.exports = mongoose.model("User", userSchema)