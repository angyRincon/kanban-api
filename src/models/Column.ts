import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, DeleteDateColumn } from "typeorm";
import Board from "./Board";

@Entity({ name: 'columns' })
class Columns {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name: string

    @ManyToOne(() => Board, (board) => board.columns)
    @JoinColumn({ name: 'board_id' })
    board: Board;

    @Column({ nullable: false, type: "int", default: 0 })
    position: number;

    @Column({ name: 'created_at', type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date

    @Column({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt: Date
}

Object.defineProperty(Columns, 'name', { value: 'Columns' })

export default Columns