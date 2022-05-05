const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express()
// middlewear
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n9iq2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        await client.connect();
        const serviceCollection = client.db('halalHotel').collection('service')

       app.get('/inventory', async(req, res)=>{
             const query = {};
             const cursor = serviceCollection.find(query);
             const services = await cursor.toArray();
             res.send(services);
       })

       app.get('/inventory/:id', async(req, res)=>{
           const id = req.params.id;
           const query ={_id: ObjectId(id)};
           const service = await serviceCollection.findOne(query);
           res.send(service);
       })

    //    post
    app.post("/inventory", async (req, res) => {
      const newService = req.body;
      const result = await serviceCollection.insertOne(newService);
      res.send(result);
    });

    // delete
    app.delete('/inventory/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)}
        const result = await serviceCollection.deleteOne(query)
        res.send(result);
    })
    // put method
    app.put('/inventory/:id', async(req, res)=>{
        const id = req.params.id;
        const updatedStock = req.body;
        const filter = {_id: ObjectId(id)}
    })

    }
    finally{

    }
}

run().catch(console.dir)



app.get('/', (req,res)=>{
    res.send('running food website')
});
app.listen(port, ()=>{
    console.log('Listening to port', port);
})