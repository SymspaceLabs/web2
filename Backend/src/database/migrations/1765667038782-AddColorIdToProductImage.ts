import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddColorIdToProductImage1765667038782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the colorId column
    await queryRunner.addColumn(
      'product_image',
      new TableColumn({
        name: 'colorId',
        type: 'uuid',
        isNullable: true,
      })
    );

    // Add the foreign key constraint
    await queryRunner.createForeignKey(
      'product_image',
      new TableForeignKey({
        columnNames: ['colorId'],
        referencedTableName: 'product_color',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Find and drop the foreign key
    const table = await queryRunner.getTable('product_image');
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('colorId') !== -1
    );
    
    if (foreignKey) {
      await queryRunner.dropForeignKey('product_image', foreignKey);
    }

    // Drop the column
    await queryRunner.dropColumn('product_image', 'colorId');
  }
}