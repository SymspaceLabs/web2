import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateProductColumns1768348829628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove the 'backing_type' column
        await queryRunner.dropColumn("product", "backing_type");

        // 2. Add the 'non_slip' column
        await queryRunner.addColumn("product", new TableColumn({
            name: "non_slip",
            type: "tinyint",
            width: 1,
            default: 0 // Represents 'false' in MySQL
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove the 'non_slip' column
        await queryRunner.dropColumn("product", "non_slip");

        // 2. Restore the 'backing_type' column
        await queryRunner.addColumn("product", new TableColumn({
            name: "backing_type",
            type: "varchar",
            isNullable: true,
        }));
    }
}