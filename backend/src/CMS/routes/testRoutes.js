import Authcontroller from "../controllers/testController";
import { Router } from "express";

const router=Router();

router.post("/create", Authcontroller.createUser);
router.post("/getUser", Authcontroller.getUsers);


module.exports = router;