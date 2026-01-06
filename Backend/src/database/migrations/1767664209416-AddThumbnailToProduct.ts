import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddThumbnailToProduct1767664209416 implements MigrationInterface {
    name = 'AddThumbnailToProduct1767664209416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add the thumbnailId column
        await queryRunner.addColumn(
            "product",
            new TableColumn({
                name: "thumbnailId",
                type: "uuid", // Ensure this matches your ProductImage ID type
                isNullable: true,
            })
        );

        // 2. Create the Foreign Key constraint
        await queryRunner.createForeignKey(
            "product",
            new TableForeignKey({
                columnNames: ["thumbnailId"],
                referencedColumnNames: ["id"],
                referencedTableName: "product_image",
                onDelete: "SET NULL", // Recommended so deleting an image doesn't delete the product
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key first
        const table = await queryRunner.getTable("product");
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("thumbnailId") !== -1
        );
        await queryRunner.dropForeignKey("product", foreignKey);

        // Drop the column
        await queryRunner.dropColumn("product", "thumbnailId");
    }
}