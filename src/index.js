import dotenv from 'dotenv'
import connectDB from "./db/index.js"

dotenv.config({
    path : './.env'
    // path : process.env.MONGODB_URI
})

connectDB()





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