import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from "typeorm";
import Task from "./Task";

@Entity({ name: 'subtask' })
class SubTask {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    description!: string

    @Column()
    completed: boolean

    @ManyToOne(() => Task, (task) => task.subtasks, { onDelete: 'CASCADE', orphanedRowAction: 'soft-delete' })
    @JoinColumn({ name: 'task_id' })
    task: Task

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date

    @Column({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt: Date
}

Object.defineProperty(SubTask, 'name', { value: 'SubTask' })

export default SubTask