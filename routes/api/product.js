// Requiring the product controller
const productcontroller = require('../../controllers/api/productcontroller');

const express = require('express');
const router = express.Router();


 router.get('/transaction',productcontroller.transaction); // to get transaction

 router.get('/statistics',productcontroller.statistics); // to get statistics

 router.get('/barchart',productcontroller.barchart); // to get barchart

 router.get('/piechart/:id',productcontroller.piechart); // to get piechart

 router.get('/statistics+barchart+piechart',productcontroller.fullStatData); // to get statistics+barchart+piechart



module.exports=router