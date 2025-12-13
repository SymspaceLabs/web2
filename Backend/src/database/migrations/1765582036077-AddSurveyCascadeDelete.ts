import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSurveyCascadeDelete1765582036077 implements MigrationInterface {
  name = 'AddSurveyCascadeDelete1765582036077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Drop the existing Foreign Key constraint on the 'survey' table
    await queryRunner.query(`
      ALTER TABLE \`survey\` 
      DROP FOREIGN KEY \`FK_5963e1aea20c3c7c2108849c08a\`
    `);

    // 2. Add a new Foreign Key constraint with ON DELETE CASCADE
    // Note: The constraint name might be auto-generated or the same as the old one
    await queryRunner.query(`
      ALTER TABLE \`survey\` 
      ADD CONSTRAINT \`FK_5963e1aea20c3c7c2108849c08a\` 
      FOREIGN KEY (\`userId\`) 
      REFERENCES \`user\`(\`id\`) 
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Drop the cascade Foreign Key constraint
    await queryRunner.query(`
      ALTER TABLE \`survey\` 
      DROP FOREIGN KEY \`FK_5963e1aea20c3c7c2108849c08a\`
    `);

    // 2. Add the original Foreign Key constraint (without ON DELETE CASCADE)
    await queryRunner.query(`
      ALTER TABLE \`survey\` 
      ADD CONSTRAINT \`FK_5963e1aea20c3c7c2108849c08a\` 
      FOREIGN KEY (\`userId\`) 
      REFERENCES \`user\`(\`id\`)
    `);
  }
}