import express from "express";
import {
  registerSchool,
  loginUser,
  refreshUserToken,
} from "../controllers/auth/authController.js";

const router = express.Router();

router.post("/register-school", registerSchool);
router.post("/login", loginUser);
router.post("/refresh-token", refreshUserToken);

export default router;