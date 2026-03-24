import dotenv from 'dotenv'
import app from './src/app.js'
import connectdb from './src/db/db.js'
dotenv.config()
connectdb().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log("Server Started")
    })
})
.catch((e)=>{
    console.log(e)
    process.exit(1)
})
