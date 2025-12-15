import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AllowProductWeightNull1765812433126 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'product',
      'productWeight',
      new TableColumn({
        name: 'productWeight',
        type: 'json',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'product',
      'productWeight',
      new TableColumn({
        name: 'productWeight',
        type: 'json',
        isNullable: false,
      }),
    );
  }
}
