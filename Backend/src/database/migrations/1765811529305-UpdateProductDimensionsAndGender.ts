import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductDimensionsAndGender1765811529305 implements MigrationInterface {
    name = 'UpdateProductDimensionsAndGender1765811529305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Make the dimensions column nullable
        await queryRunner.query(
            `ALTER TABLE \`product\` MODIFY \`dimensions\` json NULL`
        );
        
        // Change gender from simple-array (text) to varchar with enum constraint
        await queryRunner.query(
            `ALTER TABLE \`product\` MODIFY \`gender\` varchar(255) NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert: Make dimensions NOT NULL again
        await queryRunner.query(
            `ALTER TABLE \`product\` MODIFY \`dimensions\` json NOT NULL`
        );
        
        // Revert: Change gender back to text (simple-array)
        await queryRunner.query(
            `ALTER TABLE \`product\` MODIFY \`gender\` text NULL`
        );
    }
}