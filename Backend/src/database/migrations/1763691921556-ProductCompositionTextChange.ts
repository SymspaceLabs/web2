import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductCompositionTextChange1763691921556 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CORRECT MySQL syntax: Use MODIFY and change the type to TEXT.
        await queryRunner.query(`ALTER TABLE product MODIFY composition TEXT`); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // CORRECT MySQL syntax: Revert using MODIFY and setting type back to VARCHAR(255).
        // If your original VARCHAR length was different from 255, use that length instead.
        await queryRunner.query(`ALTER TABLE product MODIFY composition VARCHAR(255)`); 
    }
}