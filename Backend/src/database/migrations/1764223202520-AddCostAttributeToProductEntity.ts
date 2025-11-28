import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCostAttributeToProductEntity1764223202520 implements MigrationInterface {

  /**
   * Applies the migration: Adds the 'cost' column to the 'product' table.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'cost',
        type: 'float', // Matches your entity definition
        isNullable: true, // Matches your entity definition
      }),
    );
  }

  /**
   * Reverts the migration: Removes the 'cost' column from the 'product' table.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product', 'cost');
  }
}