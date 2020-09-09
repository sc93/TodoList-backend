import { Router } from 'express';
import * as todosCtrl from './todos.ctrl';

const todos = Router();

todos.get('/', todosCtrl.list); // list read
todos.post('/', todosCtrl.write); // write
todos.get('/:id', todosCtrl.read);
todos.patch('/:id', todosCtrl.update);
todos.delete('/:id', todosCtrl.remove);

export default todos;
