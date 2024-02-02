import { Router } from "express";
import { createSubTask, deleteSubTask, getSubTasks, updateSubTask } from "../controllers/subtaskController/subtask.controller";

const router = Router()

router.get('/subtask/task/:taskId', getSubTasks)
router.post('/subtask', createSubTask)
router.put('/subtask/:id', updateSubTask)
router.delete('/subtask/:id/task/:taskId', deleteSubTask)


export default router
