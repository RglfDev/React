import { Router } from "express";
import User from "../models/User";

const router = Router();

//Obtener Usuarios
router.get('/', async(_req,res) => {
    const users = await User.find()
    res.json(users);
})


router.post('/', async(req,res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User Created', user: newUser });
});

export default router;