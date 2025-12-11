import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveCompositionFromProduct1765277471658 implements MigrationInterface {
  // Use a more realistic timestamp for the class name

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the 'composition' column
    await queryRunner.dropColumn('product', 'composition');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-add the 'composition' column for rollback

    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'composition',
        type: 'text',
        isNullable: true,
      }),
    );
  }
}