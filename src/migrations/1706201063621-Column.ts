import { MigrationInterface, QueryRunner } from "typeorm";

export class Column1706201063621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE columns (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            board_id INT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP,
            FOREIGN KEY(board_id) REFERENCES board(id)
        )`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE columns`)
    }

}
