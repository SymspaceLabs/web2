import { MigrationInterface, QueryRunner } from "typeorm";

export class Add3DModelNewAttributes1759306206768 implements MigrationInterface {
    name = 'Add3DModelNewAttributes1759306206768';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // --- IMPORTANT FIXES FOR MYSQL/MARIADB ---
        // 1. Replaced double quotes (") with backticks (`) for all identifiers.
        // 2. Added DEFAULT clauses for NOT NULL columns to prevent the migration from failing on existing rows.

        // 1. Add 'boundingBox' column
        // Must provide a DEFAULT value since it's NOT NULL.
        // Defaulting to a valid JSON object of [0, 0, 0] for min/max.
        await queryRunner.query(`
            ALTER TABLE \`product_3d_model\`
            ADD COLUMN \`boundingBox\` JSON NOT NULL DEFAULT (JSON_OBJECT('min', JSON_ARRAY(0, 0, 0), 'max', JSON_ARRAY(0, 0, 0)))
        `);

        // 2. Add 'pivot' column
        // Must provide a DEFAULT value since it's NOT NULL.
        // Defaulting to a valid JSON array [0, 0, 0].
        await queryRunner.query(`
            ALTER TABLE \`product_3d_model\`
            ADD COLUMN \`pivot\` JSON NOT NULL DEFAULT (JSON_ARRAY(0, 0, 0))
        `);

        // 3. Add 'format' column
        // This is correctly set with a NOT NULL DEFAULT 'glb'. Use VARCHAR(50) for robust string storage.
        await queryRunner.query(`
            ALTER TABLE \`product_3d_model\`
            ADD COLUMN \`format\` VARCHAR(50) NOT NULL DEFAULT 'glb'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop columns must also use backticks for MySQL

        // 3. Drop 'format' column
        await queryRunner.query(`
            ALTER TABLE \`product_3d_model\` 
            DROP COLUMN \`format\`
        `);

        // 2. Drop 'pivot' column
        await queryRunner.query(`
            ALTER TABLE \`product_3d_model\` 
            DROP COLUMN \`pivot\`
        `);

        // 1. Drop 'boundingBox' column
        await queryRunner.query(`
            ALTER TABLE \`product_3d_model\` 
            DROP COLUMN \`boundingBox\`
        `);
    }
}