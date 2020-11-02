import { Router } from 'express';
import * as todosCtrl from './todos.ctrl';
import multer from 'multer';
import path from 'path';
const upload = multer({ dest: 'src/upload/thumbnail/' });
console.log(path.join('src/uploads/thumbnail/'));
const todos = Router();

todos.get('/', todosCtrl.list); // list read
todos.post('/', upload.single('thumbnail'), todosCtrl.write); // write
todos.get('/:id', todosCtrl.read);
todos.patch('/:id', todosCtrl.update);
todos.delete('/:id', todosCtrl.remove);

export default todos;
