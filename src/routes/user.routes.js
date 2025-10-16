import { registerUser } from "../controllers/user.controller.js";
import { Router } from "express";
const router = Router();

router.route("/register").post(registerUser)
// when request comes from /api/v1/users it is redirected to /api/v1/users/register
// Thus control is transferred to user.controller.js(registerUser)

// router.route("/login").post(login)

export default router



