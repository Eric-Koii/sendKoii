const koiSdk = require("@_koi/sdk/common");
const fsPromises = require("fs/promises");
const walletpath = "arweaveWallet.json";
const tools = new koiSdk.Common();

const fs = require('fs'); 
const csv = require('csv-parser');

const addressArr = []
const amountArr = []




inputFilePath = "test.csv"
fs.createReadStream(inputFilePath)
.pipe(csv())
.on('data', function(data){
    try {
        console.log("Reading Address: "+data.ADDRESS);
        console.log("Amount: "+data.AMOUNT);
        addressArr.push(data.ADDRESS)
        amountArr.push(data.AMOUNT)
        //perform the operation
    }
    catch(err) {
        //error handler
    }
})
.on('end', async function(){
    console.log("~~~~~ Loading wallet ~~~~~")
    await tools.loadWallet(
        JSON.parse(await fsPromises.readFile(walletpath, "utf8"))
    );

    //addressArr.forEach(transferKOII, amount);
    
    
    var arrayLength = addressArr.length;
    for (var i = 0; i < arrayLength; i++) {
        transferKOII(addressArr[i], amountArr[i])
    }
    


});  





const transferKOII = async (address, amount) => {
  
  var amountNum = parseInt(amount, 10);

  const tx = await tools.transfer(
    amountNum,
    address,
    "KOI"
  );

  console.log("Transferred :   Amount :"+amount +" "+address +"  Amount :"+amount + "KOII  ->" +tx)
};

