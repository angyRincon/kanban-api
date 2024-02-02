import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskSubTask1706203227372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE task
            DROP COLUMN subtasks_id,
            ADD subtasks_id INT,
            ADD CONSTRAINT FK_TaskSubTask
            FOREIGN KEY(subtasks_id) REFERENCES subtask(id)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE task 
        DROP COLUMN subtasks_id,
        ADD subtasks_id INT[][],
        DROP FOREIGN KEY FK_TaskSubTask
        `)
    }

}
