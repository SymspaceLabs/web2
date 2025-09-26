import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSlugToSubcategoryItem1758702427914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "subcategory_item",
            new TableColumn({
                name: "slug",
                type: "varchar",
                length: "255",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("subcategory_item", "slug");
    }
}