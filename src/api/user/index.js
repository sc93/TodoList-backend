import { Router } from 'express';
import * as userCtrl from './user.ctrl';
const user = Router();

user.post('/register', userCtrl.register);

user.post('/login', userCtrl.login);

user.post('/logout', userCtrl.logout);

user.post('/check', userCtrl.register);

export default user;
