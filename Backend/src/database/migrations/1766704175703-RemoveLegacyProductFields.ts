import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveLegacyProductFields1766704175703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the columns that were marked as "Just Removed"
        await queryRunner.dropColumns("product", [
            "price",
            "salePrice",
            "cost",
            "sizeChart",
            "productWeight",
            "dimensions"
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Restore the columns in case of a rollback
        await queryRunner.addColumns("product", [
            new TableColumn({
                name: "price",
                type: "float",
                isNullable: true,
            }),
            new TableColumn({
                name: "salePrice",
                type: "float",
                isNullable: true,
            }),
            new TableColumn({
                name: "cost",
                type: "float",
                isNullable: true,
            }),
            new TableColumn({
                name: "sizeChart",
                type: "varchar", // or 'text' depending on your original setup
                isNullable: true,
            }),
            new TableColumn({
                name: "productWeight",
                type: "json",
                isNullable: true,
            }),
            new TableColumn({
                name: "dimensions",
                type: "json",
                isNullable: true,
            }),
        ]);
    }
}