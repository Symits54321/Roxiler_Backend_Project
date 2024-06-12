const productModel= require ('../../model/product_model');



// Functions


// SeedData Function   :- to seed data  -> to get all products -------------------------------------------------------------------
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
            error:error.message|| error
        });
   }    
   
}





// Transaction Function  :- to get all products data (accord: month, search , page query)

module.exports.transaction = async function (req, res){

    try {
        
   

        let searchedText = req.query.search; // type:string
        let month = req.query.month; //type:number
        let page = req.query.page;  //type:number

        let transactionArray = await productModel.find({});


        // filter by month
        if(month>0 && month<13){
            transactionArray = await transactionArray.filter(transc => transc.dateOfSale.getMonth() === month - 1);
        }else if(month==0){
            //do nothing i.e. show all products
        }else{
            res.status(400).json({
                message:'Error in month ',
                usage:'please use month as number (1-12)  if 0 then full data is shown'
                
            });
        }


    //filter by searched text

        if(searchedText != ""){
              
            let text = searchedText.toLowerCase();
            console.log(text);

            // 

            let searchresults=[];

            if(!isNaN(parseFloat(searchedText))){

                searchresults = searchresults.concat( transactionArray.filter(transc =>
                    Math.floor(transc.price)==parseFloat(text)
                ))
            }else{

            searchresults = searchresults.concat( transactionArray.filter(transc =>
                transc.title.toLowerCase().startsWith(text) 
            ))

            searchresults = searchresults.concat( transactionArray.filter(transc =>
                transc.title.toLowerCase().includes(text) 
            ))

            searchresults = searchresults.concat( transactionArray.filter(transc =>
                transc.description.toLowerCase().includes(text)
            ))

            searchresults = searchresults.concat( transactionArray.filter(transc =>
                transc.category.toLowerCase().includes(text) 
            ))

          }
            
           

           
            transactionArray = await searchresults;

        }


        
    // get total pages

        let totalProducts = transactionArray.length;
        let totalPage=1;
        
        if(totalProducts>10){
            totalPage = Math.floor(totalProducts/10);
            if(totalProducts%10!=0){
                totalPage++;
            }
        }
        

     // filter by page no.

           // 
           if(page<1 || page> totalPage) {
               
            res.status(400).json({
                message:'Error in page value ',
                usage:'page value must start with 1  and max value of total page only',
                totalpage:totalPage
            });

           }
           
          // setting start and end index
            let si = (page-1)*10;
            let ei = page*10;
            if(totalProducts<page*10){
                ei = totalProducts;
            }

           //slicing the transaction array to get particular page array
           
           transactionArray = transactionArray.slice(si,ei);


                return(
                    res.status(200).json({
                        message:'succesfully got transaction data',
                        data:{
                            page:page,
                            totalPage:totalPage,
                            totalProducts:totalProducts,
                            products:transactionArray
                        }
                    })
                )



    } catch (error) {
        console.error('Error in getting transaction:', error);
        res.status(500).json({
            message:'Error in getting transaction ',
            error:error.message|| error
            
        });
    }
        
    

}




// PieChart Function :-  to get picechart of products in a particular month
module.exports.piechart = async function (req,res){

 
 try {
    


    let month = req.query.month;

    let piechartdata = await productModel.find({});

    if(month>0 && month<13){
        piechartdata = piechartdata.filter(x => x.dateOfSale.getMonth() === month - 1);
    }else if(month==0){
        //do nothing i.e. show all 
    }else{
        res.status(400).json({
            message:'Error in month ',
            usage:'please use month as number (1-12)  if 0 then full data is shown'
            
        });
    }
    
   
    
    let hashmap={};

    piechartdata.forEach((x)=>{
         
          if (hashmap[x.category]){
             // if contains x.category then increase its value
             hashmap[x.category]++         
          }else{
           // else create key of category name and value as 1
             hashmap[x.category] = 1;
          }
    })


    return(
        res.status(200).json({
            message:'succesfully got piechart data',
            data:{
                month:month,
                data:hashmap

            }
        })
    )






 } catch (error) {

    console.error('Error in getting transaction:', error);
    res.status(500).json({
        message:'Error in getting piechart ',
        error:error.message|| error
        
    });
    
 }

}


// Statistics Function :- to get statistics data of products in a particular month
module.exports.statistics = async function (req,res){

  try {

    let month = req.query.month;


    let statisticsData = await productModel.find({});

    if(month>0 && month<13){
        statisticsData = statisticsData.filter(x => x.dateOfSale.getMonth() === month - 1);
    }else if(month==0){
        //do nothing i.e. show all 
    }else{
        res.status(400).json({
            message:'Error in month ',
            usage:'please use month as number (1-12)  if 0 then full data is shown'
            
        });
    }

  

    let totalSale = statisticsData.length ;
    let sold = statisticsData.filter(x => x.sold == true).length;
    
    return(
        res.status(200).json({
            message:'succesfully got statistics data',
            data:{
                month:month,
                data:{
                    totalSale:totalSale,
                    totalSoldItem:sold,
                    totalUnsoldItems:totalSale-sold
                }

            }
        })
    )  
    

 } catch (error) {

    console.error('Error in getting statistics:', error);
    res.status(500).json({
        message:'Error in getting statistics ',
        error:error.message|| error
        
    });
    
 }
  


}



// Barchart Function :- to get barchart data of products in a particular month
module.exports.barchart = async function (req,res){

 try {
  
      let month = req.query.month;
  
      let barchartData = await productModel.find({});
      
     // filter by month

      if(month>0 && month<13){
        barchartData = barchartData.filter(x => x.dateOfSale.getMonth() === month - 1);
      }else if(month==0){
          //do nothing i.e. show all 
      }else{
          res.status(400).json({
              message:'Error in month ',
              usage:'please use month as number (1-12)  if 0 then full data is shown'
              
          });
      }

     //creating hashmap
      let hashmap = {};

     //price range data adding through for loop
      for(i=0; i<9; i++){
         let totalProductsLength = barchartData.filter(x=>x.price>=(i*100) && x.price<=((i+1)*100)).length;
         let key = `${i*100} to ${(i+1)*100}`;
         hashmap[key]=totalProductsLength;
      }

      hashmap['900 to above']= barchartData.filter(x => x.price >= 900).length;
      

      return(
        res.status(200).json({
            message:'succesfully got BarChart data',
            data:{
                month:month,
                data:hashmap

            }
        })
    )  
    

 } catch (error) {

    console.error('Error in getting Barchart:', error);
    res.status(500).json({
        message:'Error in getting Barchart ',
        error:error.message|| error
        
    });
    
}
      
    
    
}




