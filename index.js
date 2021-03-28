const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const bodyParser = require('body-parser');

const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())
// database connection
const user = 'emajohnserver';
const pass = 'emajohn100';

/// send email from server to user
const transporter =  nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'soheltanbir19@gmail.com',
        pass:'sohelrana@76435'
    }
})
const mailOptions ={
    from:'soheltanbir19@gmail.com',
    to:'sohelrana.webdeveloper@gmail.com',
    subject:'Sending email using Node.js',
    text:'I am just learn how to send email using node and express js'
}
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error)
    }else{
        console.log('Email sent ' + info.response)
    }
})




const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kjddt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true,useNewUrlParser: true,
    useUnifiedTopology: true });
client.connect(err => {
  const database = client.db("emaJohnStore").collection("products");
  const OrderDb = client.db("emaJohnStore").collection("order");
  

    // insert data into database
    app.post('/addProduct', (req, res)=>{
        const product = req.body;
        database.insertMany(product)
        .then(result =>{
            console.log(result);
        })
    })

    // read data from database 
    app.get('/products', (req, res)=>{
        database.find({}).limit(20)
        .toArray((err, documents)=>{
            res.send(documents)
        })
    })


     // products details
     app.get('/products/:key', (req, res)=>{
        database.find({key:req.params.key})
        .toArray((err, documents)=>{
            res.send(documents[0])
        })
    });

    // review products
    app.post('/productsKeys', (req, res)=>{
        const productKeys = req.body;
        database.find({key:{$in:productKeys}})
        .toArray((err,documents)=>{
            res.send(documents);
        })
    })

     // customer order data store in database
     app.post('/addOrder', (req, res)=>{
        const order = req.body;
        OrderDb.insertOne(order)
        .then(result =>{
            console.log(result);
        })
    })

});




app.get('/', (req, res)=>{
    res.send('Welcome to ema-jhon-website development')
})

app.listen(process.env.PORT || 5000)