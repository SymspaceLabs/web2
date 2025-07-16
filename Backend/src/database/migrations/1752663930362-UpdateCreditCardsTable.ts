import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateCreditCardsTable1752663930362 implements MigrationInterface {
    name = 'UpdateCreditCardsTable1752663930362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Try to drop existing foreign key. If it doesn't exist, catch the error and proceed.
        try {
            await queryRunner.query(`ALTER TABLE \`credit_cards\` DROP FOREIGN KEY \`FK_316ec479135fbc369ccf229dd0f\``);
            console.log('Dropped existing FK_316ec479135fbc369ccf229dd0f from credit_cards.');
        } catch (error) {
            // MySQL error code 1091 is 'ER_CANT_DROP_FIELD_OR_KEY'
            if (error.code === 'ER_CANT_DROP_FIELD_OR_KEY' || error.message.includes("Can't DROP")) {
                console.warn('Foreign key FK_316ec479135fbc369ccf229dd0f does not exist, skipping drop.');
            } else {
                throw error; // Re-throw other unexpected errors
            }
        }

        // Add the missing cardBrand column
        // If there are existing rows, set a default value for 'cardBrand' before making it NOT NULL
        await queryRunner.addColumn('credit_cards', new TableColumn({
            name: 'cardBrand',
            type: 'varchar',
            length: '50',
            isNullable: true, // Make it temporarily nullable to add
        }));
        // Update existing NULL values to a default (e.g., 'unknown')
        await queryRunner.query(`UPDATE \`credit_cards\` SET \`cardBrand\` = 'unknown' WHERE \`cardBrand\` IS NULL`);
        // Then alter the column to be NOT NULL
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`cardBrand\` \`cardBrand\` varchar(50) NOT NULL`);


        // Update existing NULL values for expiryMonth to a default (e.g., 1)
        await queryRunner.query(`UPDATE \`credit_cards\` SET \`expiryMonth\` = 1 WHERE \`expiryMonth\` IS NULL`);
        // Then alter the column to be NOT NULL
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`expiryMonth\` \`expiryMonth\` int NOT NULL`);

        // Update existing NULL values for expiryYear to a default (e.g., 20)
        await queryRunner.query(`UPDATE \`credit_cards\` SET \`expiryYear\` = 20 WHERE \`expiryYear\` IS NULL`);
        // Then alter the column to be NOT NULL
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`expiryYear\` \`expiryYear\` int NOT NULL`);
        
        // Existing generated queries
        await queryRunner.query(`ALTER TABLE \`credit_cards\` ADD UNIQUE INDEX \`IDX_a358a26def849b562cd49465fd\` (\`paymentGatewayToken\`)`);
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`userId\` \`userId\` varchar(36) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_8c08402a67a5099917aa3e3fbf\` ON \`credit_cards\` (\`last4\`)`);
        
        // Re-add the foreign key with ON DELETE CASCADE
        await queryRunner.query(`ALTER TABLE \`credit_cards\` ADD CONSTRAINT \`FK_316ec479135fbc369ccf229dd0f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Try to drop the foreign key. If it doesn't exist, catch the error and proceed.
        try {
            await queryRunner.query(`ALTER TABLE \`credit_cards\` DROP FOREIGN KEY \`FK_316ec479135fbc369ccf229dd0f\``);
            console.log('Dropped FK_316ec479135fbc369ccf229dd0f from credit_cards during down migration.');
        } catch (error) {
            if (error.code === 'ER_CANT_DROP_FIELD_OR_KEY' || error.message.includes("Can't DROP")) {
                console.warn('Foreign key FK_316ec479135fbc369ccf229dd0f does not exist, skipping drop during down migration.');
            } else {
                throw error;
            }
        }
        
        // Revert cardBrand column changes
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`cardBrand\` \`cardBrand\` varchar(50) NULL`); // Make it nullable again
        await queryRunner.dropColumn('credit_cards', 'cardBrand'); // Then drop it

        // Existing generated queries (in reverse order of up)
        await queryRunner.query(`DROP INDEX \`IDX_8c08402a67a5099917aa3e3fbf\` ON \`credit_cards\``);
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`userId\` \`userId\` varchar(36) NULL`); // Assuming it was nullable before
        await queryRunner.query(`ALTER TABLE \`credit_cards\` DROP INDEX \`IDX_a358a26def849b562cd49465fd\``);
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`expiryYear\` \`expiryYear\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`expiryMonth\` \`expiryMonth\` int NULL`);
        
        // Re-add the foreign key as it was before (if needed, or simply omit if dropping table)
        await queryRunner.query(`ALTER TABLE \`credit_cards\` ADD CONSTRAINT \`FK_316ec479135fbc369ccf229dd0f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
