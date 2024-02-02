import { Request, Response } from "express"
import { connection } from "../../typeorm"
import Task from "../../models/Task"
import SubTask from "../../models/SubTask"
import Columns from "../../models/Column"

export const getTasks = async (req: Request, res: Response) => {
    const taskRepository = connection.getRepository(Task)
    const tasks = await taskRepository.find({
        where: { column: { id: Number(req.params.columnId) } },
        relations: ['subtasks']
    })

    return res.json(tasks)
}

export const createTask = async (req: Request, res: Response) => {
    const { title, description, position, columnId, subtasks } = req.body

    await connection.manager.transaction(async (manager) => {
        const taskRepository = manager.getRepository(Task)
        const subTasksRepository = manager.getRepository(SubTask)

        const newTask = taskRepository.create({
            title,
            description,
            position,
            column: { id: columnId },
        })

        const savedTask = await taskRepository.save(newTask)

        await Promise.all(
            subtasks.map(async (subTask) => {
                const newSubTask = subTasksRepository.create({
                    description: subTask,
                    completed: false,
                    task: { id: savedTask.id }
                })

                return subTasksRepository.save(newSubTask)
            })
        )

        return res.json(savedTask)

    })
}

export const updateTask = async (req: Request, res: Response) => {
    const { title, description, columnId, subtasks } = req.body

    await connection.manager.transaction(async (manager) => {
        const taskRepository = manager.getRepository(Task)
        const subTasksRepository = manager.getRepository(SubTask)
        const columnsRepository = manager.getRepository(Columns)

        const task = await taskRepository.findOne({
            where: { id: Number(req.params.id), column: { id: columnId } }
        })

        const column = await columnsRepository.findOne({
            where: { id: columnId }
        })

        task.title = title
        task.description = description
        task.column = column

        await Promise.all(
            subtasks.map(async (sb) => {
                if (sb.id) {
                    const subtask = await subTasksRepository.findOne({ where: { id: sb.id, task: { id: task.id } } })
                    subtask.id = sb.id
                    subtask.description = sb.description
                    subtask.completed = sb.completed
                    return subTasksRepository.save(subtask)
                } else {
                    return subTasksRepository.save({
                        description: sb,
                        completed: false,
                        task: { id: task.id }
                    })
                }
            })
        )

        await taskRepository.save(task)
        return res.json('Task updated')
    })
}

export const deleteTask = async (req: Request, res: Response) => {
    const taskRepository = connection.getRepository(Task)
    const task = await taskRepository.findOne({
        where: { id: Number(req.params.id), column: { id: Number(req.params.columnId) } }
    })
    await taskRepository.softDelete(task.id)
    return res.json('Task Deleted')
}