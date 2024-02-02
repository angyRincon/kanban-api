import { MigrationInterface, QueryRunner } from "typeorm";

export class SubTask1706202878172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE subtask (
            id SERIAL PRIMARY KEY,
            decription TEXT NOT NULL,
            task_id INT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP,
            FOREIGN KEY(task_id) REFERENCES task(id)
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE subtask`)
    }

}
