import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductCompositionTextChange1763691921556 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Example MySQL/PostgreSQL query
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "composition" TYPE text`); 
        // The exact syntax depends on your database and TypeORM version
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert back to the old type, e.g., VARCHAR(255)
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "composition" TYPE varchar(255)`); 
    }
}