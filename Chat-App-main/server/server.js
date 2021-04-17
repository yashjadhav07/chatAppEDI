const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importing Vairables
require('dotenv').config();

// Connecting Middleware
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connecting MongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log("MongoDB Connection established");
});

// Connecting Routes
const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})