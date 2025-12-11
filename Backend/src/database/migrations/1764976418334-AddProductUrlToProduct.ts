import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddProductUrlToProduct1764976418334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'productUrl',
        type: 'varchar',
        isNullable: true, // This makes the column optional
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product', 'productUrl');
  }
}