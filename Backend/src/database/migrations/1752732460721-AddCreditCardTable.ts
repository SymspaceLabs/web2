import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class AddCreditCardsTable1752732460721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create credit_cards table
    await queryRunner.createTable(
      new Table({
        name: 'credit_cards',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'cardBrand',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'last4',
            type: 'varchar',
            length: '4',
          },
          {
            name: 'expiryMonth',
            type: 'int',
          },
          {
            name: 'expiryYear',
            type: 'int',
          },
          {
            name: 'isDefault',
            type: 'boolean',
            default: false,
          },
          {
            name: 'paymentGatewayToken',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'cardHolderName',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Add index on last4
    await queryRunner.createIndex(
      'credit_cards',
      new TableIndex({
        name: 'IDX_CREDIT_CARD_LAST4',
        columnNames: ['last4'],
      }),
    );

    // Add index on paymentGatewayToken (redundant since isUnique, but explicit)
    await queryRunner.createIndex(
      'credit_cards',
      new TableIndex({
        name: 'IDX_CREDIT_CARD_TOKEN',
        columnNames: ['paymentGatewayToken'],
        isUnique: true,
      }),
    );

    // Add foreign key to user table
    await queryRunner.createForeignKey(
      'credit_cards',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('credit_cards');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('userId') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('credit_cards', foreignKey);
      }
    }

    await queryRunner.dropIndex('credit_cards', 'IDX_CREDIT_CARD_LAST4');
    await queryRunner.dropIndex('credit_cards', 'IDX_CREDIT_CARD_TOKEN');
    await queryRunner.dropTable('credit_cards');
  }
}
