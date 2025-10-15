import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            index: true    
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary URL
            required: true
        },
        coverImage: {
            type: String // cloudinary URL
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)


/*Define the behavior: You use userSchema.pre('save', ...) to define a piece of middleware logic. This code tells Mongoose, "Before you execute any save() operation on a document created from this schema, run this function first".

Use the Model: Whenever you call the .save() method on an instance of the User model, Mongoose consults the schema for any registered middleware. It finds the pre('save') hook and executes your password-hashing function automatically before saving the document to the database.
we used async since hashing would take time
*/

userSchema.pre("save", async function (next){
    if (!this.isModified("password")) {
        return next()
    }
    // else
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

// when user submits password it will not match the hashed password so we need to convert it into the hashed password so that user can be authenticated

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password,this.password)
}

// "password" is the password provided while user tries to log in
// "this.password" is the password present in the db(encrypted one)
// bcrypt looks at "this.password" and extracts the salt and hashes the "password" 
// and then compares them
// means comparison is done between both salted ones
// returns in boolean

// JWT stands for JSON Web Token, which is an open, industry-standard (RFC 7519) for securely transmitting information between two parties as a compact and self-contained JSON object. It is commonly used for authentication and authorization because it can be digitally signed to verify its authenticity and integrity. A JWT consists of three parts—a header, a payload (claims), and a signature—separated by dots, such as xxxxx.yyyyy.zzzzz
// Used to verify the sender's identity and ensure that the token has not been altered.

// Here's a breakdown of its components and purpose:
// Payload: This is the data you want to include in the JWT. It's typically a JSON object containing "claims" – information about an entity (e.g., user ID, roles) and additional metadata (e.g., token expiration time).
// Secret Key (or Private Key): This is a crucial piece of information used to generate the digital signature of the JWT.
// Symmetric algorithms (e.g., HMAC): A single secret key is used for both signing and verifying the token.
// Asymmetric algorithms (e.g., RSA, ECDSA): A private key is used for signing, and a corresponding public key is used for verification.

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id, //this valuecomes from dB
            email: this.email,
            username: this.username,
            fullname: this.fullname

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
} 

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
       {
         _id: this._id
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
       }
    )
}


export const User = mongoose.model("User",userSchema)