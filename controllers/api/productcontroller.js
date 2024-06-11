const productModel= require ('../../model/product_model');



// Functions


// seedData Function   :- to seed data  -> to get all products -------------------------------------------------------------------
module.exports.seedData = async function (req, res) {
  
    try {                                          // using try and catch

      let fetchedResponse = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
     
      // check response
        if (!fetchedResponse.ok){
            console.error('Error in fetching 3rd party API:', error);
            res.status(500).send('Error in fetching 3rd party API ');
        }
     
      //console.log("fetchedResponse is")
        let fetchedDataJson = await fetchedResponse.json();
      //console.log(FetchedDatajson);


      
      // delete all products
         await productModel.deleteMany({})

      // seeding new products
         await productModel.insertMany(fetchedDataJson);

      // getting product from model
      let products = await productModel.find({});  
  
      // checking seeding results
         if(products.length>0){                             
    
              return res.status(200).json({
                    message: 'List of products seeded successfully from third party-API',
                    data: {
                    products: products
                    }             
              });
  
          }else{
  
            return res.status(200).json({                       
              message: 'No products added',
              data:[]
              
            });
  
        }


    // error message
    }catch(error) {                                          
        console.error('Error in seeding product:', error);
        res.status(500).json({
            message:'Error in seeding product ',
           
        });
   }    
   
}







