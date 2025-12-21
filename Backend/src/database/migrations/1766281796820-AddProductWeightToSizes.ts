// src/migrations/TIMESTAMP-AddProductWeightToSizes.ts

import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddProductWeightToSizes1766281796820 implements MigrationInterface {
    name = 'AddProductWeightToSizes1766281796820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add productWeight column to product_size table
        await queryRunner.addColumn(
            "product_size",
            new TableColumn({
                name: "productWeight",
                type: "json",
                isNullable: true,
                comment: "Product weight stored as JSON with value and unit (always kg)"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove productWeight column if migration is reverted
        await queryRunner.dropColumn("product_size", "productWeight");
    }
}