import { Router } from "express";
import { addColumn, deleteColumn, getColumns, updateColumn } from "../controllers/columnsController/columns.controller";

const router = Router()

router.get('/column/board/:boardId', getColumns)
router.post('/column', addColumn)
router.put('/column/:id', updateColumn)
router.delete('/column/:id/board/:boardId', deleteColumn)

export default router 