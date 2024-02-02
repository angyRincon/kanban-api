import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne, DeleteDateColumn } from "typeorm";
import Columns from "./Column";
import SubTask from "./SubTask";

@Entity({ name: 'task' })
class Task {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    description!: string

    @Column({ nullable: false, type: "int", default: 0 })
    position: number;

    @ManyToOne(() => Columns)
    @JoinColumn({ name: 'column_id' })
    column: Columns

    @OneToMany(() => SubTask, (subtask) => subtask.task, { cascade: ['soft-remove'] })
    @JoinColumn()
    subtasks: SubTask[]

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date

    @Column({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt: Date
}

Object.defineProperty(Task, 'name', { value: 'Task' })

export default Task