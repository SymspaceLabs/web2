import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddMobileLevel2NameToSubcategoryItem1761037683686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "subcategory_item",
            new TableColumn({
                name: "mobileLevel2Name",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("subcategory_item", "mobileLevel2Name");
    }

}