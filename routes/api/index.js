const express = require('express');
const router = express.Router();


// directing to product.js
 router.use('/products',require('./product'));
 



module.exports=router;