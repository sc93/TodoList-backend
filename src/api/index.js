import { Router } from 'express';
import user from './user';
import todos from './todos';
const api = new Router();

api.use('/user', user);
api.use('/todos', todos);

export default api;
