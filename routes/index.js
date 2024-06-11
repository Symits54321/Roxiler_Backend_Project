const express = require('express');

// requiring routes
const router = express.Router();



 router.use('/',require('./api/index'));
 



module.exports=router;