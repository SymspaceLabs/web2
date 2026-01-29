import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSortOrderToProductColor1769677104410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "product_color",
            new TableColumn({
                name: "sortOrder",
                type: "int",
                default: 0,
                isNullable: false, // Matches your @Column default behavior
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("product_color", "sortOrder");
    }

}