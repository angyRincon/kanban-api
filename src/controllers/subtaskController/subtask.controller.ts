import { Request, Response } from "express";
import { connection } from "../../typeorm";
import SubTask from "../../models/SubTask";

export const getSubTasks = async (req: Request, res: Response) => {
    const subTasksRepository = connection.getRepository(SubTask)
    const subTasks = await subTasksRepository.find({
        where: { task: { id: Number(req.params.taskId) } }
    })
    return res.json(subTasks)
}

export const createSubTask = async (req: Request, res: Response) => {
    const { description, taskId } = req.body

    const subTasksRepository = connection.getRepository(SubTask)
    const newSubTask = subTasksRepository.create({
        description,
        completed: false,
        task: { id: taskId }
    })
    const savedSubTask = await subTasksRepository.save(newSubTask)
    return res.json(savedSubTask)
}

export const updateSubTask = async (req: Request, res: Response) => {
    const { description, completed, taskId } = req.body
    const subTasksRepository = connection.getRepository(SubTask)

    const subTask = await subTasksRepository.findOne({
        where: { id: Number(req.params.id), task: { id: taskId } }
    })

    subTask.description = description
    subTask.completed = completed ?? false

    await subTasksRepository.save(subTask)
    return res.json('Subtask saved')
}

export const deleteSubTask = async (req: Request, res: Response) => {
    const subTasksRepository = connection.getRepository(SubTask)
    const subTask = await subTasksRepository.findOne({
        where: { id: Number(req.params.id), task: { id: Number(req.params.taskId) } }
    })

    await subTasksRepository.softDelete(subTask.id)
    return res.json('Subtask Deleted')
}