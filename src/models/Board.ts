import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";

@Entity({ name: 'board' })
class Board {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column({ name: 'created_at', type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt: Date
}

Object.defineProperty(Board, 'name', { value: 'Board' })

export default Board