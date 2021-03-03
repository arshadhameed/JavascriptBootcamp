const express=require('express');
const cors=require('cors');
const app=express();
const path=require("path");
const routes=require('./routes')
const mongoose=require('mongoose');


const PORT=process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
if(process.env.MODE_ENV !=='production'){
   
    require('dotenv').config();
}

try{
    mongoose.connect(process.env.MONGO_DB_CONNECTION,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log('Mongo Db connected');
}
catch(error){
    console.log(error);
}

app.use("/files",express.static(path.resolve(__dirname,"..","files")));
app.use(routes);


app.listen(PORT,()=>{

    console.log(`listening on ${PORT}`);
});