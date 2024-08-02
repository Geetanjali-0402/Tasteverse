const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/Register"
// ).then(()=>{
//     console.log(`connection successful`);
// }).catch((e)=>{
//     console.log(`no connection`);
// })

);try {
    console.log("connection success");
} catch (error) {
    console.log("no connection");
};