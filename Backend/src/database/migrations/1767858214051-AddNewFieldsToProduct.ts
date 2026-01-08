import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFieldsToProduct1767858214051 implements MigrationInterface {
    name = 'AddNewFieldsToProduct1767858214051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`product\` 
            ADD \`shape\` varchar(255) NULL,
            ADD \`pattern\` varchar(255) NULL,
            ADD \`pile_height\` varchar(255) NULL,
            ADD \`room_type\` varchar(255) NULL,
            ADD \`washable\` tinyint NOT NULL DEFAULT 0,
            ADD \`backing_type\` varchar(255) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`product\` 
            DROP COLUMN \`backing_type\`,
            DROP COLUMN \`washable\`,
            DROP COLUMN \`room_type\`,
            DROP COLUMN \`pile_height\`,
            DROP COLUMN \`pattern\`,
            DROP COLUMN \`shape\`
        `);
    }
}