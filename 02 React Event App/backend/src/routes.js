const express=require('express');
const multer=require('multer');
const verifyToken=require('./config/verifyToken');

const routes=express.Router();
const UserController=require('./controllers/UserController');
const EventController=require('./controllers/EventController');
const DashboardController=require('./controllers/DashboardController');
const LoginController=require('./controllers/LoginController');
const RegistrationController=require('./controllers/RegistrationController')
const ApprovalController=require('./controllers/ApprovalController');
const RejectionController=require('./controllers/RejectionController');

const uploadConfig=require('./config/upload');
const upload=multer(uploadConfig);


routes.get('/status',(req,res)=>{
    
    res.send({status :200});
});

//Registration
routes.post('/registration/:eventId', RegistrationController.create)
routes.get('/registration/:registration_id',RegistrationController.getRegistration);
routes.post('/registration/:registration_id/approval',ApprovalController.apporval)
routes.post('/registration/:registration_id/rejection',RejectionController.rejection)


//login
routes.post('/login',LoginController.store)

//DashBoard
routes.get('/dashboard/:sport',verifyToken,DashboardController.getAllEvents);
routes.get('/dashboard',verifyToken,DashboardController.getAllEvents);
routes.get('/user/events',verifyToken,DashboardController.getEventById)
routes.get('/event/:eventId',verifyToken,DashboardController.getEventById);

//for event
routes.post('/event',upload.single("thumbnail"),EventController.createEvent);

routes.delete('/event/:eventId',verifyToken,EventController.delete);



//for user
routes.post('/user/register',UserController.createUser);
routes.get('/user/:userId',UserController.getUserById);

module.exports=routes;