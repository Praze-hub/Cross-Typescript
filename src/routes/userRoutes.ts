import { Router } from "express";
import {
    getUsers, addUser, editUser, removeUser
} from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);
router.post('/users', addUser);
router.put("/users/:userId", editUser);
router.delete("/users/:userId", removeUser);



export default router;