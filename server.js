const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('./connection');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const typeKendaraanRouter = require('./routes/typeRouter');
const kendaraanRouter = require('./routes/kendaraanRouter');

app.listen(process.env.PORT | 5000, () => {
    console.log("Server Jalan");
});

mysql.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("Database Jalan");
    }
});


app.use('/api/types', typeKendaraanRouter);
app.use('/api/kendaraans', kendaraanRouter);

