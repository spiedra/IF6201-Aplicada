import { Router } from "express";
import { validateLogin } from "../controllers/login.controller";

const router = Router();

router.post("/login", validateLogin);

export default router;