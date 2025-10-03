import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductNewAttributes1759307150901 implements MigrationInterface {
    name = 'AddProductNewAttributes1759307150901';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add 'currency' column (String default is fine for MySQL)
        await queryRunner.query(`
            ALTER TABLE "product" 
            ADD COLUMN "currency" character varying NOT NULL 
            DEFAULT 'USD'
        `);

        // 2. Add 'productWeight' column (DEFAULT clause removed due to MySQL restriction on JSON columns)
        await queryRunner.query(`
            ALTER TABLE "product" 
            ADD COLUMN "productWeight" json NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Drop 'productWeight' column
        await queryRunner.query(`
            ALTER TABLE "product" 
            DROP COLUMN "productWeight"
        `);

        // 2. Drop 'currency' column
        await queryRunner.query(`
            ALTER TABLE "product" 
            DROP COLUMN "currency"
        `);
    }
}