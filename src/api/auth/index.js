import { Router } from 'express';
import * as authCtrl from './auth.ctrl';
const auth = Router();

auth.post('/register', authCtrl.register);

auth.post('/login', authCtrl.login);

auth.post('/logout', authCtrl.logout);

auth.post('/check', authCtrl.check);

export default auth;
