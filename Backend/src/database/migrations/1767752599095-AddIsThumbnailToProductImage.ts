import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddIsThumbnailToProductImage1767752599095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "product_image", // Ensure this matches your actual table name in the DB
            new TableColumn({
                name: "isThumbnail",
                type: "boolean",
                default: false,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("product_image", "isThumbnail");
    }

}