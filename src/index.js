import dotenv from 'dotenv'
import connectDB from "./db/index.js"
import { app } from './app.js'


dotenv.config({
    path : './.env' 
})


// This is our server file we connect to DB from here
// We also begin the server listening here
connectDB()
.then(() => {
    app.on("error",(error) => {
        console.log("MongoDB connection error",error)
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
    

})
.catch( (err) => {
    console.log("MongoDB connection failed !!!",err)
})




// Another Way
/*
( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // Next we are Checking if there is any problem while trying to connect to DB
        app.on("error", (error) => {
            console.log("Error:",error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on ${process.env.PORT}`)
        })


    } catch (error) {
        console.log("Error :",error)
    }
})()
*/