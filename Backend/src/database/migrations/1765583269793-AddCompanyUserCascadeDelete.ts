import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyUserCascadeDelete1765583269793 implements MigrationInterface {

    name = 'AddCompanyUserCascadeDelete1765583269793';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Drop the existing Foreign Key constraint on the 'companies' table.
        // This is necessary because constraints cannot be directly altered.
        console.log('Dropping existing FK on companies table...');
        await queryRunner.query(`
            ALTER TABLE \`companies\` 
            DROP FOREIGN KEY \`FK_6d64e8c7527a9e4af83cc66cbf7\`
        `);

        // 2. Add the new Foreign Key constraint with the ON DELETE CASCADE clause.
        console.log('Adding new FK with ON DELETE CASCADE...');
        await queryRunner.query(`
            ALTER TABLE \`companies\` 
            ADD CONSTRAINT \`FK_6d64e8c7527a9e4af83cc66cbf7\` 
            FOREIGN KEY (\`userId\`) 
            REFERENCES \`user\`(\`id\`) 
            ON DELETE CASCADE
        `);
        console.log('FK updated successfully.');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Revert: Drop the cascade Foreign Key constraint.
        console.log('Dropping cascade FK on companies table...');
        await queryRunner.query(`
            ALTER TABLE \`companies\` 
            DROP FOREIGN KEY \`FK_6d64e8c7527a9e4af83cc66cbf7\`
        `);

        // 2. Revert: Add the original Foreign Key constraint (without ON DELETE CASCADE).
        console.log('Re-adding original FK...');
        await queryRunner.query(`
            ALTER TABLE \`companies\` 
            ADD CONSTRAINT \`FK_6d64e8c7527a9e4af83cc66cbf7\` 
            FOREIGN KEY (\`userId\`) 
            REFERENCES \`user\`(\`id\`)
        `);
        console.log('FK reverted successfully.');
    }

}