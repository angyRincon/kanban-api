import { NextFunction, Request, Response } from "express";
import { connection } from "../../typeorm";
import Board from "../../models/Board";
import Columns from "../../models/Column";
import { BoardInput } from "../../types/Board";
import { repeatedElements } from "../../utils.ts/repeatedElements";
import { triggerError } from "../../utils.ts/triggerError";

export const getBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardRepository = connection.getRepository(Board)
        const board = await boardRepository.findOne({
            where: { id: Number(req.params.id) },
            relations: ['columns']
        })
        if (!board) return triggerError(404, 'Board not found', next)

        return res.json(board)
    } catch (err) {
        next(err)
    }
}

export const getBoards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardRepository = connection.getRepository(Board);
        const boards = await boardRepository.find()
        return res.json(boards)
    } catch (err) {
        next(err)
    }
}

export const addBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardRepository = connection.getRepository(Board)
        const columnsRepository = connection.getRepository(Columns)
        const columns = req.body.columns as string[]
        const repeatedColumns = repeatedElements(columns)

        if (repeatedColumns.length) return triggerError(400, "Column name must be unique", next)

        const newBoard = boardRepository.create(req.body as BoardInput)
        const savedBoard = await boardRepository.save(newBoard)

        await Promise.all(
            columns.map(async (column) => {
                return columnsRepository.save({
                    name: column,
                    board: { id: savedBoard.id }
                })
            })
        )

        return res.json(savedBoard)

    } catch (err) {
        next(err)
    }
}

export const updatedBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardRepository = connection.getRepository(Board);
        const columnsRepository = connection.getRepository(Columns);

        const board = await boardRepository.findOne({
            where: { id: Number(req.params.id) }
        })

        if (!board || !board.id) return triggerError(404, 'Board not found', next)

        const columns = await columnsRepository.find({ where: { board: { id: board.id } } })
        const columnsMap = new Map(columns.map(c => [c.name, c]))

        await Promise.all(
            req.body.columns.map(async (c) => {
                if (c?.id) {
                    const column = await columnsRepository.findOne({ where: { id: c?.id, board: { id: board.id } } })

                    if (!column) {
                        await Promise.reject(triggerError(404, 'Column does not exist', next))
                        return
                    }

                    column.id = c.id
                    column.name = c.name

                    return columnsRepository.save(column)

                } else {
                    if (columnsMap.has(c)) {
                        await Promise.reject(triggerError(400, 'Column name must unique', next))
                        return
                    }

                    return columnsRepository.save({
                        name: c,
                        board: { id: board.id }
                    })
                }
            })
        )

        board.name = req.body.name

        await boardRepository.save(board)

        return res.json('Board updated')
    } catch (err) {
        next(err)
    }
}

export const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const boardRepository = connection.getRepository(Board)

        const board = await boardRepository.findOne({ where: { id: Number(req.params.id) } })

        if (!board) return triggerError(404, 'Board not found', next)

        await boardRepository.softDelete(req.params.id)

        return res.json('Board deleted')

    } catch (err) {
        next(err)
    }
}
