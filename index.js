
// Port
const port = 8102;

// Express app
const express = require('express');
const app = express();

//CORS
const cors = require('cors');
app.use(cors());

// database
const db = require('./config/mongoose');


//routes
app.use('/',require('./routes/index'));


// Listening
app.listen(port,function(err){
    if(err){
        console.log('not able to listen port');
    }
    console.log(`Roxiller-Server is Listening to port:${port}`);
    
});