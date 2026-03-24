import mongoose from "mongoose";
async function connectdb(){
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        .then(()=>{
            console.log("Datebase connected Succesfully")
        })
    }
    catch(err){
        console.log("Database not connected")
        throw new Error("DB connection failed")
    }

}
export default connectdb
