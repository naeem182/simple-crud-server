const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//naeemislamjr182
//70I25wmluvLFDpMX


app.use(cors());
app.use(express.json());

//mongo



const uri = "mongodb+srv://naeemislamjr182:70I25wmluvLFDpMX@cluster0.il0t7ji.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        //node mongodb crud->usages exp->insert operation
        const database = client.db("usersDB");
        const userCollection = database.collection("users");
        // const userCollection = client.db('usersDB').collection('users');//1 line



        //create
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('new user', user)
            // 
            const result = await userCollection.insertOne(user);
            res.send(result)

        })


        //get
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);










app.get('/', (req, res) => {
    res.send("SIMPLE CRUD IS RUNNING");
})
app.listen(port, () => {
    console.log(`SIMPLE CRUD IS RUNNING on port,${port}`)
})
