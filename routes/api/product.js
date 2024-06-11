// Requiring the product controller
const productcontroller = require('../../controllers/api/productcontroller');

const express = require('express');
const router = express.Router();


router.get('/initialize',productcontroller.seedData); // fetch the JSON from the third party API and initialize the database

  router.get('/transaction',productcontroller.transaction); // to get transaction

//  router.get('/statistics',productcontroller.statistics); // to get statistics

//  router.get('/barchart',productcontroller.barchart); // to get barchart

router.get('/piechart',productcontroller.piechart); // to get piechart

//  router.get('/statistics+barchart+piechart',productcontroller.fullStatData); // to get statistics+barchart+piechart



module.exports=router