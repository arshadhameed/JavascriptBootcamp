const Event=require('../models/event')
const User=require('../models/Users');
const jwt=require('jsonwebtoken')

module.exports={
    createEvent(req,res){
       
       jwt.verify(req.headers.user,'secret',async(err,authData)=>{
            
           
            if (err) {
                console.log(err)
                res.sendStatus(403);
                
            } else {
               
                const {title,description,price,sport,date}=req.body;
                console.log(title,description,price,sport,date);

                const {filename}=req.file;
        
                const user = await User.findById(authData.user._id);
                if(!user){
                    return res.status(400).json({message:'User does not exist'});
                }  
                try {
                    const event =await Event.create({
                        title,
                        description,
                        sport,
                        price,
                        date,
                        user:authData.user._id,
                        thumbnail:filename,
                        
                    });
                    return res.json(event)
                } catch (error) {
                    return res.status(400).json({message:error})  
                }
             
               
                
            }

    })
},
 delete(req,res){
     if (err) {
         res.sendStatus(401);
         
     } else {
        jwt.verify(req.token,'secret',async(err,authData)=>{
            const {eventId}=req.params;
            console.log(eventId);
            try {
                 const event=await Event.findByIdAndDelete(eventId)
                 return res.status(204).send()
            } catch (error) {
                return res.status(400).json({message:'We dont have any events with this ID'});
                
            }
         
     })
    
}

}
}