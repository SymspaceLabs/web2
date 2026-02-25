import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeGenderNullable1771929158910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`preference\`
      MODIFY COLUMN \`gender\` varchar(255) NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`preference\`
      MODIFY COLUMN \`gender\` varchar(255) NOT NULL
    `);
  }
}