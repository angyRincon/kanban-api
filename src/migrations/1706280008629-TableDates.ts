import { MigrationInterface, QueryRunner } from "typeorm";

export class TableDates1706280008629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE board
            ALTER COLUMN created_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP,
            ALTER COLUMN updated_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP
        `)

        await queryRunner.query(`
            ALTER TABLE columns
            ALTER COLUMN created_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP,
            ALTER COLUMN updated_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP
        `)

        await queryRunner.query(`
            ALTER TABLE task
            ALTER COLUMN created_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP,
            ALTER COLUMN updated_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP
        `)

        await queryRunner.query(`
            ALTER TABLE subtask
            ALTER COLUMN created_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP,
            ALTER COLUMN updated_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE board
            ALTER COLUMN created_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP,
            ALTER COLUMN updated_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP
        `)

        await queryRunner.query(`
            ALTER TABLE columns
            ALTER COLUMN created_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP,
            ALTER COLUMN updated_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP
        `)

        await queryRunner.query(`
            ALTER TABLE task
            ALTER COLUMN created_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP,
            ALTER COLUMN updated_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP
        `)

        await queryRunner.query(`
            ALTER TABLE subtask
            ALTER COLUMN created_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP,
            ALTER COLUMN updated_at TYPE timestamp with time zone USING CURRENT_TIMESTAMP
        `)
    }
}
