// mongoose requiring
const mongoose = require("mongoose");


// defining mongoose.connect -- through async function main()
async function main(){
    let url = 'mongodb://127.0.0.1:27017/roxiler_database';  // localhost database
     await mongoose.connect(`${url}`);                                     // connecting function
}


// Calling the above function to connect to mongodb 
main()
  .catch(err => console.log("mongodb database err"+err))             // calling + catching error




 // saving the mongoose connection whinch is the database needed for exploring query
 const db = mongoose.connection; 

 // when database conneccted not succesfully for further execution
 db.on('error',console.error.bind(console,'error connecting to db'));

// if connected then show the message true
 db.once('open',function(){
    console.log('Succesfully connected to the database')
  });


//exporting

module.export = db;