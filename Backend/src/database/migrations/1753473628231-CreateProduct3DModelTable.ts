import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProduct3DModel1753473628231 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_3d_model',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'colorCode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'productId',
            type: 'varchar',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'product_3d_model',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product_3d_model');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes('productId'));
    if (foreignKey) {
      await queryRunner.dropForeignKey('product_3d_model', foreignKey);
    }
    await queryRunner.dropTable('product_3d_model');
  }
}
