import { Router } from "express";
import { addBoard, deleteBoard, getBoards, updatedBoard } from "../controllers/boardController/board.controller";
import { uris } from "../config/uris";

const router = Router()

const { getBoardUri, createBoardUri, updateBoardUri, deleteBoardUri } = uris.board

router.get(getBoardUri, getBoards)
router.post(createBoardUri, addBoard)
router.put(updateBoardUri, updatedBoard)
router.delete(deleteBoardUri, deleteBoard)

export default router;