const express = require('express');
require('dotenv').config();

//Create Server
const app = express();

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