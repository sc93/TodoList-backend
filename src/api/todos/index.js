import { Router } from 'express';
import * as todosCtrl from './todos.ctrl';
const todos = Router();

todos.get('/', todosCtrl.list); // list read
todos.post('/', todosCtrl.write); // write

const todo = Router();
todo.get('/', todosCtrl.read);
todo.patch('/', todosCtrl.update);
todo.delete('/', todosCtrl.remove);

todos.use('/:id', todo);

export default todos;
