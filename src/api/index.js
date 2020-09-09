import { Router } from 'express';
import auth from './auth';
import todos from './todos';
import checkloggedIn from '../lib/checkloggedIn';

const api = new Router();

api.use('/auth', auth);
api.use('/todos', checkloggedIn, todos);

export default api;
