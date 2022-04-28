const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middlewire
app.use(cors())
app.use(express.json())

// userName: dbVolunteer
// password: 2uHOvzwjOJlNjRYe

const uri = `mongodb+srv://${process.env.DB_VOLUNTEER}:${process.env.DB_PASS}@cluster0.rpnzg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const volunteerCollection = client.db('volunteerDB').collection('volunteers');

        app.get('/service',async(req, res)=>{
            const query = {};
            const cursor = volunteerCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally {}
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('running volunteer server');
})
app.listen(port, () => {
    console.log('volunteer server is running');
})