const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
//Create Server
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//Public Directory
app.use( express.static('public') );

//Read an Parse body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));

//Listen
app.listen(process.env.PORT, () => {
  console.log(`Server run at port ${process.env.PORT}`);
});