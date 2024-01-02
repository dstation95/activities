const express = require('express');
require('dotenv').config();
require('./models/mongo.js');
const userRouter = require('./routes/user');

// const mongoose = require('mongoose');
// console.log(process.env.MONGODB_URI);
// mongoose.connect(process.env.MONGODB_URI).then(() => {
//     console.log("db connected");
// })

const app = express()

app.use(express.json());
app.use(userRouter);

// app.post('/creat3e')    

app.get('/test', (req, res) => {
    res.send("HELLO WORLD");
})

app.listen(8000, () => {
    console.log('port is listening');
})

// backend\models\mongo.js