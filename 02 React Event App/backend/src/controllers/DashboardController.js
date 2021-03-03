const Event=require('../models/event')
const jwt=require('jsonwebtoken')

module.exports={
    async getEventById(req,res){
        jwt.verify(req.token,'secret',async(err,authData)=>{
            if (error) {
                res.sendStatus(403)
            } else {
                const {eventId}=req.params;
        
                try {
                    const events= await Event.findById(eventId);
                    
                if(events){
                    return res.json({authData:authData,events:events});
                }
                    
                } catch (error) {
                    return res.status(400).json({message:'EventId does not exist'});
                    
                }
                
            }

    })
    
    }
    ,
    async getAllEvents(req,res){
        jwt.verify(req.token,'secret',async(err,authData)=>{
            if(err){
                res.sendStatus(401)
            } else {
                //console.log("token",req.token)
                const {sport}=req.params;      
                const querry=sport ? {sport} : {}
                  try {
                 const events= await Event.find(querry);
                 
                if(events){
                    return res.json({authData,events});
                }
                    
                } catch (error) {
                    return res.status(400).json({message:'We dont have any events'});
                    
                }

            }
        })


    },
    async getAllEventsByUserId(req,res){
        jwt.verify(req.token,'secret',async(err,authData)=>{
            if (error) {
                res.sendStatus(403)
                
            } else {
                const {user_id}=req.headers;
    
                try {
                 const events= await Event.find({user:authData.user._id});
                    
                if(events){
                    return res.json(authData,events);
                }
                    
                } catch (error) {
                    return res.status(400).json({message:`We dont have any events with the user id ${user_id}`})
                    
                }
        
                
            }
          })
    }
}