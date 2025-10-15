import express, { urlencoded } from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()
// This is our express handling file
// this will contain the Middlewares

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

// This below app.use is going to accept json files sent from
// the use 
app.use(express.json({limit : "16kb"}))

// This below is going to accept data from places like
// username password from forms
// extended property allows nested objects as inputs from users
app.use(express.urlencoded({extended : true,limit : "16kb"}))

// this below is gonna store files like pdfs imgs etc
// from inputs in the public/temp folder
// that are available as public assets(accessible by anyone)
app.use(express.static("public"))


// cookieParser inside a server is to handle and manage cookies in incoming HTTP requests easily. It enables the server to read, parse, and access cookie data sent by the client, allowing functionalities like user authentication, session management, personalization, and tracking.
app.use(cookieParser())

export {app}