const express = require('express');
const cors = require('cors');
require("dotenv").config();
const port=process.env.PORT||5000;
const app=express();
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qskky.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        
    }
    
    finally{

    }
}

run();

app.get("/",(req,res)=>{
    res.send("Server is Running");
});

app.listen(port,()=>{
    console.log("Listening from port",port);
});

