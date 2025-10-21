import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddMobileLevel3NameToSubcategoryItemChild1761034135611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "subcategory_item_child",
            new TableColumn({
                name: "mobileLevel3Name",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("subcategory_item_child", "mobileLevel3Name");
    }

}