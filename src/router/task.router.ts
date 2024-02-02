import { Router } from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController/task.controller';

const router = Router()

router.get('/task/column/:columnId', getTasks)
router.post('/task', createTask)
router.put('/task/:id', updateTask)
router.delete('/task/:id/column/:columnId', deleteTask)

export default router;