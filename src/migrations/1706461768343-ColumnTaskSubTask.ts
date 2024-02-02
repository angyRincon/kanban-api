import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnTaskSubTask1706461768343 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE columns
            ADD position INT,
            ADD CONSTRAINT UQ_columns_name_position
            UNIQUE(position)
        `)

        await queryRunner.query(`
            ALTER TABLE task
            ADD title TEXT NOT NULL,
            ADD position INT NOT NULL,
            DROP CONSTRAINT fk_tasksubtask,
            DROP COLUMN subtasks_id,
            ADD CONSTRAINT UQ_task_title_position
            UNIQUE(position)
        `)

        await queryRunner.query(`
            ALTER TABLE subtask
            ADD completed BOOLEAN DEFAULT FALSE,
            ADD description TEXT NOT NULL,
            DROP CONSTRAINT subtask_task_id_fkey,
            ADD CONSTRAINT FK_subtask_tasks
            FOREIGN KEY(task_id) REFERENCES task(id)
            ON DELETE CASCADE ON UPDATE CASCADE
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE columns
            DROP CONSTRAINT UQ_columns_name_position,
            DROP column position
        `)

        await queryRunner.query(`
            ALTER TABLE task
            ADD subtasks_id INT,
            ADD CONSTRAINT fk_tasksubtask
            FOREIGN KEY(subtasks_id) REFERENCES subtask(id),
            DROP CONSTRAINT UQ_task_title_position,
            DROP COLUMN position,
            DROP COLUMN title
        `)

        await queryRunner.query(`
            ALTER TABLE subtask
            DROP CONSTRAINT FK_subtask_tasks,
            ADD CONSTRAINT subtask_task_id_fkey
            FOREIGN KEY(task_id) REFERENCES task(id),
            DROP COLUMN description,
            DROP COLUMN completed
        `)
    }

}
