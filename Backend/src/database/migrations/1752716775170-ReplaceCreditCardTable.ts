import { MigrationInterface, QueryRunner } from "typeorm";

export class ReplaceCreditCardTable1710xxxxxx implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS credit_cards`);

    await queryRunner.query(`
      CREATE TABLE credit_cards (
        id varchar(36) NOT NULL PRIMARY KEY,
        cardBrand varchar(50) NOT NULL,
        last4 varchar(4) NOT NULL,
        expiryMonth int NOT NULL,
        expiryYear int NOT NULL,
        isDefault boolean NOT NULL DEFAULT false,
        paymentGatewayToken varchar(255) NOT NULL UNIQUE,
        cardHolderName varchar(255),
        userId varchar(36) NOT NULL,
        createdAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updatedAt datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        CONSTRAINT FK_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        INDEX IDX_last4 (last4),
        INDEX IDX_paymentToken (paymentGatewayToken)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS credit_cards`);
  }
}
