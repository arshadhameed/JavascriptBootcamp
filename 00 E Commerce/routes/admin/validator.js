 const {check}=require('express-validator');
const usersRepo=require('../../repositories/users');
module.exports={
    requireTitle: check('title').trim().isLength({min:4,max:40}).withMessage('Must be between and 4 and 40 characters'),
    requirePrice: check('price').trim().toFloat().isFloat({min:1}).withMessage('Must be greater than 1'),

    requreEmail:check('email').trim().normalizeEmail().isEmail().withMessage("Must be a valid email")
    .custom(async (email)=>{
        const existingUser= await usersRepo.getOneby({email});
        if(existingUser){
           throw new Error('Email in use');
        } 
    }),
    requirePassword: check('password').trim().isLength({min:3, max:20}).withMessage("Must be between 3 and 20"),
    requireConfirmPassword:check('confirmpassword').trim().isLength({min:3, max:20}).withMessage("Must be between 3 and 20")
    .custom((confirmpassword,{req})=>{
        if(confirmpassword!==req.body.password){
            throw new Error("password must watch");

        }
        return true;
    }),
    requireEmailExists:  check('email').trim().normalizeEmail().isEmail().withMessage('Must be a valid email address')
    .custom(async(email)=>{
        const user=await usersRepo.getOneby({email});
        if(!user){
            throw new Error ('Email not found');
        }
    }),
    requireValidPassword: check('password').trim()
    .custom(async(password,{req})=>{
        const user=await usersRepo.getOneby({email:req.body.email});
        if(!user){
            throw new Error("invalid password");
        }
        const validPassword=await usersRepo.comparePassword(user.password,password);
        if(!validPassword){
            throw new Error('invalid Password');
        }
    })
};