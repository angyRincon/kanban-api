import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnConstraint1706295140059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE columns
            DROP CONSTRAINT columns_board_id_fkey
        `)

        await queryRunner.query(`
            ALTER TABLE columns
            ADD CONSTRAINT FK_columns_board
            FOREIGN KEY(board_id) REFERENCES board(id)
            ON DELETE CASCADE ON UPDATE CASCADE
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE columns
            ADD CONSTRAINT columns_board_id_fkey
            FOREIGN KEY(board_id) REFERENCES board(id)
        `)
    }

}
