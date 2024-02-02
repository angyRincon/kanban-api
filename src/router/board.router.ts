import { Router } from "express";
import { addBoard, deleteBoard, getBoard, getBoards, updatedBoard } from "../controllers/boardController/board.controller";
import { uris } from "../config/uris";
const router = Router()

const { getBoardsUri, getBoardUri, createBoardUri, updateBoardUri, deleteBoardUri } = uris.board

router.get(getBoardsUri, getBoards)
router.get(getBoardUri, getBoard)
router.post(createBoardUri, addBoard)
router.put(updateBoardUri, updatedBoard)
router.delete(deleteBoardUri, deleteBoard)

export default router;