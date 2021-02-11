const express=require('express');

const {handErrors}=require('./middlewares');
const usersRepo=require('../../repositories/users');
const signupTemplate=require('../../views/admin/auth/signup');
const signinTemplate=require('../../views/admin/auth/signin');
const {requreEmail,requirePassword,requireConfirmPassword,requireEmailExists,requireValidPassword}=require('./validator');
const router=express.Router();
router.get('/signup',(req,res)=>{
    res.send(signupTemplate({req}));
}); 

router.post('/signup',
    [requreEmail,requirePassword,requireConfirmPassword],
    handErrors(signupTemplate),
     async(req,res)=>{
   
    const {email,password}=req.body;
    const user=await usersRepo.create({email,password});
    req.session.userId=user.id;
    res.redirect('/admin/products');
});
router.get('/signout',(req,res)=>{
    req.session=null;
    res.send('You are logged out');
})
router.get('/signin',(req,res)=>{
    res.send(signinTemplate({}));
});
router.post('/signin',[
    requireEmailExists,
    requireValidPassword
], 
    handErrors(signinTemplate),
    async(req,res)=>{
       const {email}=req.body;
     const user=await usersRepo.getOneby({email});

     
 
     req.session.userId=user.id;
     res.redirect('/admin/products');
});

module.exports=router;
