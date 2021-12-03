const app = require("./index")
const connect = require("./configs/db.js")


  
app.listen(2345, async()=>{
        await connect()
        console.log("listing at the port 2345")
    })

   

