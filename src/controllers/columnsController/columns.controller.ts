import { NextFunction, Request, Response } from "express";
import { connection } from "../../typeorm";
import Columns from "../../models/Column";
import { triggerError } from "../../utils.ts/triggerError";

export const getColumns = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const columnsRepository = connection.getRepository(Columns)
        const columns = await columnsRepository.find({
            where: { board: { id: Number(req.params.boardId) } }
        })
        return res.json(columns)
    } catch (err) {
        next(err);
    }
}

export const addColumn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, boardId } = req.body
        
        if (!boardId) return triggerError(404, "Board doesn't exist", next)
        if (!name) return triggerError(400, 'Column name is required', next)

        const columnsRepository = connection.getRepository(Columns)
        const newColumn = columnsRepository.create({ name, board: { id: boardId } })
        await columnsRepository.save(newColumn)
        return res.json('Column Saved')
    } catch (err) {
        next(err)
    }
}

export const updateColumn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, boardId } = req.body
        const columnsRepository = connection.getRepository(Columns)

        const column = await columnsRepository.findOne({
            where: { id: Number(req.params.id), board: { id: boardId } }
        })

        column.name = name
        await columnsRepository.save(column)

        return res.json('Column updated')
    } catch (err) {
        next(err)
    }
}

export const deleteColumn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const columnsRepository = connection.getRepository(Columns)
        const column = await columnsRepository.findOne({
            where: { id: Number(req.params.id), board: { id: Number(req.params.boardId) } }
        })
        await columnsRepository.softDelete(column.id)
        return res.json('Deleted succesfully')
    } catch (err) {
        next(err)
    }
}