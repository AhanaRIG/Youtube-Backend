import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { Router } from "express";
const router = Router();

router.route("/register").post(
    // .fields is provided by multer, even though we created multer.middleware.js
    // its a multer thing
    upload.fields( 
    [
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)
// when request comes from /api/v1/users it is redirected to /api/v1/users/register
// Thus control is transferred to user.controller.js(registerUser)

// router.route("/login").post(login)

export default router



