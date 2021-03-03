const User=require('../models/Users');
const bcrypt=require('bcrypt');
module.exports={
    async createUser(req,res){
        try {
           const {firstName,lastName,password,email}=req.body;
           const existUser=await User.findOne({email});
           if(!existUser){
               const hashedPassword=await bcrypt.hash(password,10);
               const user= await User.create({
                firstName:firstName,
                lastName:lastName,
                password:hashedPassword,
                email:email
                
            });
            return res.json({
                _id:user._id,
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName
            });

           }
           return res.status(400).json({
               message:'email/user already exist !  do you want to log in'
           });

           console.log("user registered");
        } catch(err) {
            throw Error(`Error while registering new user ${err}`);
            
        }
    },
    async getUserById(req,res){
        const {userId}=req.params;
        try {
            
            const user= await User.findById(userId);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({
                message:'email/user does not exist'
            });
            
        }
    }
}