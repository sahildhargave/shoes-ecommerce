const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const productRoute = require('./routes/products');
const authRoute = require('./routes/auth');

const port = 3000

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => console.log("db connected")).catch((e) => console.log(e))

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));


app.use('/api/products', productRoute);
app.use('/api/',authRoute);

app.listen(process.env.PORT || port, () => 
console.log(`Example app listening on port ${process.env.PORT}!`))