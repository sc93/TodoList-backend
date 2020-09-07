import { Router } from 'express';
import auth from './auth';
import todos from './todos';
const api = new Router();

api.use('/auth', auth);
api.use('/todos', todos);

export default api;
