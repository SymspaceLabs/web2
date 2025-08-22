import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSubcategoryItemChildTable1755766504083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create table
    await queryRunner.createTable(
      new Table({
        name: "subcategory_item_child",
        columns: [
          {
            name: "id",
            type: "char",
            length: "36", // UUID stored as string
            isPrimary: true,
            isNullable: false,
            default: "UUID()", // MySQL function for generating UUIDs
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "slug",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "subCategoryItemId",
            type: "char",
            length: "36", // FK to subcategory_item.id
            isNullable: false,
          },
        ],
      }),
      true
    );

    // Add foreign key to subcategory_item
    await queryRunner.createForeignKey(
      "subcategory_item_child",
      new TableForeignKey({
        columnNames: ["subCategoryItemId"],
        referencedColumnNames: ["id"],
        referencedTableName: "subcategory_item",
        onDelete: "CASCADE", // delete children if parent deleted
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key first
    const table = await queryRunner.getTable("subcategory_item_child");
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("subCategoryItemId") !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("subcategory_item_child", foreignKey);
    }

    // Drop table
    await queryRunner.dropTable("subcategory_item_child");
  }
}
