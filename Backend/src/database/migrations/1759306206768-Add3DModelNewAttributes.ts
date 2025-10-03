import { MigrationInterface, QueryRunner } from "typeorm";

export class Add3DModelNewAttributes1759306206768 implements MigrationInterface {
    name = 'Add3DModelNewAttributes1759306206768';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add 'boundingBox' column (DEFAULT removed due to MySQL restriction)
        await queryRunner.query(`
            ALTER TABLE "product_3d_model" 
            ADD COLUMN "boundingBox" json NOT NULL
        `);

        // 2. Add 'pivot' column (DEFAULT removed due to MySQL restriction)
        await queryRunner.query(`
            ALTER TABLE "product_3d_model" 
            ADD COLUMN "pivot" json NOT NULL
        `);

        // 3. Add 'format' column with a default value of 'glb'
        // 'text' is often used for string columns in migrations, but 'varchar' or similar might be more appropriate depending on the dialect.
        // Assuming a standard VARCHAR/TEXT type and setting the default.
        await queryRunner.query(`
            ALTER TABLE "product_3d_model" 
            ADD COLUMN "format" character varying NOT NULL DEFAULT 'glb'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 3. Drop 'format' column
        await queryRunner.query(`
            ALTER TABLE "product_3d_model" 
            DROP COLUMN "format"
        `);

        // 2. Drop 'pivot' column
        await queryRunner.query(`
            ALTER TABLE "product_3d_model" 
            DROP COLUMN "pivot"
        `);

        // 1. Drop 'boundingBox' column
        await queryRunner.query(`
            ALTER TABLE "product_3d_model" 
            DROP COLUMN "boundingBox"
        `);
    }
}