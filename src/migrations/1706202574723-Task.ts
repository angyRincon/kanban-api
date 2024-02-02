import { MigrationInterface, QueryRunner } from "typeorm";

export class Task1706202574723 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE task (
            id SERIAL PRIMARY KEY,
            description TEXT NOT NULL,
            column_id INT,
            subtasks_id INT[][],
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP,
            FOREIGN KEY(column_id) REFERENCES columns(id)
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE task`)
    }

}
