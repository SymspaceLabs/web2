import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDimensionsToProductSize1766188027574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "product_size",
            new TableColumn({
                name: "dimensions",
                type: "json",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("product_size", "dimensions");
    }

}