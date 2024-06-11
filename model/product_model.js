// requiring mongoose from library
const mongoose = require('mongoose');

// product schema
const productSchema = new mongoose.Schema( {

   id:{

        type:Number,
        required:true
   },

   title:{

        type:String,
        required:true

   },

   price:{

        type:Number,
        required:true

   },

   description:{

        type:String,
        required:true

   },

   category:{

        type:String,
        required:true

   },
   
   image:{

        type:String,
        required:true

    },

   sold:{

        type:Boolean,
        required:true

   },
   
   dateOfSale:{

     type:Date,
     required:true

   }



 }
);

// making model mongoose.model('modelname/collection',schema);
const productmodel = mongoose.model('products', productSchema);

module.exports=productmodel;
