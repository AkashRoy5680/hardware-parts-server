const express = require('express');
const cors = require('cors');
require("dotenv").config();
const port=process.env.PORT||5000;
const app=express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware
app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qskky.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
    const serviceCollection=client.db("parts_hub").collection("services");
    const reviewCollection=client.db("parts_hub").collection("reviews");
    const orderCollection=client.db("parts_hub").collection("orders");

    //Load All Services
    app.get("/service",async(req,res)=>{
        const query={};
        const cursor=serviceCollection.find(query);
        const services=await cursor.toArray();
        res.send(services);
      });

    //Load Single Services
    app.get("/service/:id",async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)};
        const service=await serviceCollection.findOne(query);
        res.send(service);
    });
    //Filtering Email Orders
    app.get("/order",async(req,res)=>{
        const email=req.query.userEmail;
        const query={email:email};
        const orders=await orderCollection.find(query).toArray();
        res.send(orders);
    })

    
    app.get("/review",async(req,res)=>{
        const query={};
        const cursor=reviewCollection.find(query);
        const reviews=await cursor.toArray();
        res.send(reviews);
    }); 
      
    //POST method to add new review and send it to server

    app.post("/review", async (req, res) => {
        const newItem =req.body;
        const result = await reviewCollection.insertOne(newItem);
        res.send(result);
    });

    //POST method to add order and send it to server
    app.post("/order",async(req,res)=>{
        const newOrder=req.body;
        const result=await orderCollection.insertOne(newOrder);
        res.send(result);
    })

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

