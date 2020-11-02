import { Router } from 'express';
import * as todosCtrl from './todos.ctrl';
import multer from 'multer';
const upload = multer({ dest: 'src/upload/thumbnail/' });
const todos = Router();

todos.get('/', todosCtrl.list); // list read
todos.post('/', upload.single('thumbnail'), todosCtrl.write); // write
todos.get('/:id', todosCtrl.read);
todos.patch('/:id', todosCtrl.update);
todos.delete('/:id', todosCtrl.remove);

export default todos;
