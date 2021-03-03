const moongose=require('mongoose');

const RegistrationSchema=new moongose.Schema({
    date: String,
    approved:Boolean,
    user:{
        type: moongose.Schema.Types.ObjectId,
        ref:"User"
    },
    event:{
        type:moongose.Schema.Types.ObjectId,
        ref:"Event"
    }

});

module.exports=moongose.model("Registration",RegistrationSchema)