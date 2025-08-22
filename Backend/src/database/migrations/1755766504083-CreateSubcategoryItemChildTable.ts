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
            length: "36",
            isPrimary: true,
            isNullable: false,
            generationStrategy: "uuid", // let TypeORM handle it
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
            length: "36",
            isNullable: false,
          },
        ],
      }),
      true
    );

    // Add foreign key
    await queryRunner.createForeignKey(
      "subcategory_item_child",
      new TableForeignKey({
        columnNames: ["subCategoryItemId"],
        referencedColumnNames: ["id"],
        referencedTableName: "subcategory_item",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("subcategory_item_child");
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("subCategoryItemId") !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("subcategory_item_child", foreignKey);
    }
    await queryRunner.dropTable("subcategory_item_child");
  }
}
