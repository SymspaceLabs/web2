import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToSubcategory1758790630078 implements MigrationInterface {

    name = 'AddSlugToSubcategory1758790630078' // Name property is often needed by TypeORM

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the 'slug' column to the 'subcategory' table.
        // It's set to VARCHAR(255) and made nullable for simplicity during the add phase.
        // If the slug must be unique, you can add a unique constraint here as well.
        await queryRunner.query(`
            ALTER TABLE subcategory 
            ADD slug VARCHAR(255) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the 'slug' column in case the migration needs to be reverted.
        await queryRunner.query(`
            ALTER TABLE subcategory 
            DROP COLUMN slug
        `);
    }

}