import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from "typeorm"; // Import TableIndex

export class UpdateCreditCardsTable1752663930362 implements MigrationInterface {
    name = 'UpdateCreditCardsTable1752663930362'

    // Helper function to check if an index exists
    private async hasIndex(queryRunner: QueryRunner, tableName: string, indexName: string): Promise<boolean> {
        const result = await queryRunner.query(`
            SELECT COUNT(*) AS count
            FROM INFORMATION_SCHEMA.STATISTICS
            WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = '${tableName}'
            AND INDEX_NAME = '${indexName}'
        `);
        return result[0].count > 0;
    }

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

        // --- Handle 'cardBrand' column ---
        const hasCardBrandColumn = await queryRunner.hasColumn('credit_cards', 'cardBrand');
        if (!hasCardBrandColumn) {
            await queryRunner.addColumn('credit_cards', new TableColumn({
                name: 'cardBrand',
                type: 'varchar',
                length: '50',
                isNullable: true, // Add as nullable first
            }));
            console.log('Added cardBrand column to credit_cards.');
        } else {
            console.log('cardBrand column already exists in credit_cards, skipping add.');
        }
        await queryRunner.query(`UPDATE \`credit_cards\` SET \`cardBrand\` = 'unknown' WHERE \`cardBrand\` IS NULL`);
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`cardBrand\` \`cardBrand\` varchar(50) NOT NULL`);
        console.log('Ensured cardBrand is NOT NULL and updated NULLs.');

        // --- Handle 'paymentGatewayToken' column and its unique index ---
        const hasPaymentGatewayTokenColumn = await queryRunner.hasColumn('credit_cards', 'paymentGatewayToken');
        if (!hasPaymentGatewayTokenColumn) {
            await queryRunner.addColumn('credit_cards', new TableColumn({
                name: 'paymentGatewayToken',
                type: 'varchar',
                length: '255',
                isNullable: true, // Add as nullable first
            }));
            console.log('Added paymentGatewayToken column to credit_cards.');
        } else {
            console.log('paymentGatewayToken column already exists in credit_cards, skipping add.');
        }
        // Update existing NULL values to a default (e.g., an empty string or a placeholder token)
        await queryRunner.query(`UPDATE \`credit_cards\` SET \`paymentGatewayToken\` = '' WHERE \`paymentGatewayToken\` IS NULL`);
        // Then alter the column to be NOT NULL
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`paymentGatewayToken\` \`paymentGatewayToken\` varchar(255) NOT NULL`);
        console.log('Ensured paymentGatewayToken is NOT NULL and updated NULLs.');

        // Add unique index for paymentGatewayToken if it doesn't exist
        const hasPaymentGatewayTokenIndex = await this.hasIndex(queryRunner, 'credit_cards', 'IDX_a358a26def849b562cd49465fd'); // Use helper
        if (!hasPaymentGatewayTokenIndex) {
             await queryRunner.createIndex('credit_cards', new TableIndex({
                name: 'IDX_a358a26def849b562cd49465fd', // Use the exact index name
                columnNames: ['paymentGatewayToken'],
                isUnique: true,
            }));
            console.log('Added unique index for paymentGatewayToken.');
        } else {
            console.log('Unique index for paymentGatewayToken already exists, skipping add.');
        }

        // --- Handle 'last4' column and its index ---
        const hasLast4Column = await queryRunner.hasColumn('credit_cards', 'last4');
        if (!hasLast4Column) {
            await queryRunner.addColumn('credit_cards', new TableColumn({
                name: 'last4',
                type: 'varchar',
                length: '4',
                isNullable: true, // Add as nullable first
            }));
            console.log('Added last4 column to credit_cards.');
        } else {
            console.log('last4 column already exists in credit_cards, skipping add.');
        }
        // Update existing NULL values to a default (e.g., '0000')
        await queryRunner.query(`UPDATE \`credit_cards\` SET \`last4\` = '0000' WHERE \`last4\` IS NULL`);
        // Then alter the column to be NOT NULL
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`last4\` \`last4\` varchar(4) NOT NULL`);
        console.log('Ensured last4 is NOT NULL and updated NULLs.');

        // Add index for last4 if it doesn't exist
        const hasLast4Index = await this.hasIndex(queryRunner, 'credit_cards', 'IDX_8c08402a67a5099917aa3e3fbf'); // Use the index name from your generated query
        if (!hasLast4Index) {
            await queryRunner.createIndex('credit_cards', new TableIndex({
                name: 'IDX_8c08402a67a5099917aa3e3fbf', // Use the exact index name
                columnNames: ['last4'],
                isUnique: false, // This index is not unique based on your entity
            }));
            console.log('Added index for last4.');
        } else {
            console.log('Index for last4 already exists, skipping add.');
        }

        // --- Handle 'isDefault' column ---
        const hasIsDefaultColumn = await queryRunner.hasColumn('credit_cards', 'isDefault');
        if (!hasIsDefaultColumn) {
            await queryRunner.addColumn('credit_cards', new TableColumn({
                name: 'isDefault',
                type: 'boolean', // Or 'tinyint' for MySQL
                isNullable: true, // Add as nullable first
                default: false // Set a default value for new columns
            }));
            console.log('Added isDefault column to credit_cards.');
        } else {
            console.log('isDefault column already exists in credit_cards, skipping add.');
        }
        // Update existing NULL values to false (matching entity default)
        await queryRunner.query(`UPDATE \`credit_cards\` SET \`isDefault\` = FALSE WHERE \`isDefault\` IS NULL`);
        // Then alter the column to be NOT NULL
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`isDefault\` \`isDefault\` tinyint(1) NOT NULL`); // Use tinyint(1) for boolean in MySQL
        console.log('Ensured isDefault is NOT NULL and updated NULLs.');


        // --- Handle 'expiryMonth' column ---
        await queryRunner.query(`UPDATE \`credit_cards\` SET \`expiryMonth\` = 1 WHERE \`expiryMonth\` IS NULL`);
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`expiryMonth\` \`expiryMonth\` int NOT NULL`);
        console.log('Ensured expiryMonth is NOT NULL and updated NULLs.');

        // --- Handle 'expiryYear' column ---
        await queryRunner.query(`UPDATE \`credit_cards\` SET \`expiryYear\` = 20 WHERE \`expiryYear\` IS NULL`);
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`expiryYear\` \`expiryYear\` int NOT NULL`);
        console.log('Ensured expiryYear is NOT NULL and updated NULLs.');
        
        // --- Remaining generated queries ---
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`userId\` \`userId\` varchar(36) NOT NULL`);
        
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
        const hasCardBrandColumn = await queryRunner.hasColumn('credit_cards', 'cardBrand');
        if (hasCardBrandColumn) {
            await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`cardBrand\` \`cardBrand\` varchar(50) NULL`); // Make it nullable again
            await queryRunner.dropColumn('credit_cards', 'cardBrand'); // Then drop it
            console.log('Dropped cardBrand column from credit_cards during down migration.');
        } else {
            console.log('cardBrand column does not exist, skipping drop during down migration.');
        }

        // Revert paymentGatewayToken column and index changes
        const hasPaymentGatewayTokenIndex = await this.hasIndex(queryRunner, 'credit_cards', 'IDX_a358a26def849b562cd49465fd');
        if (hasPaymentGatewayTokenIndex) {
            await queryRunner.dropIndex('credit_cards', 'IDX_a358a26def849b562cd49465fd');
            console.log('Dropped unique index for paymentGatewayToken during down migration.');
        } else {
            console.log('Unique index for paymentGatewayToken does not exist, skipping drop during down migration.');
        }
        const hasPaymentGatewayTokenColumn = await queryRunner.hasColumn('credit_cards', 'paymentGatewayToken');
        if (hasPaymentGatewayTokenColumn) {
            await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`paymentGatewayToken\` \`paymentGatewayToken\` varchar(255) NULL`); // Make it nullable again
            await queryRunner.dropColumn('credit_cards', 'paymentGatewayToken'); // Then drop it
            console.log('Dropped paymentGatewayToken column from credit_cards during down migration.');
        } else {
            console.log('paymentGatewayToken column does not exist, skipping drop during down migration.');
        }

        // Revert last4 column and index changes
        const hasLast4Index = await this.hasIndex(queryRunner, 'credit_cards', 'IDX_8c08402a67a5099917aa3e3fbf');
        if (hasLast4Index) {
            await queryRunner.dropIndex('credit_cards', 'IDX_8c08402a67a5099917aa3e3fbf');
            console.log('Dropped index for last4 during down migration.');
        } else {
            console.log('Index for last4 does not exist, skipping drop during down migration.');
        }
        const hasLast4Column = await queryRunner.hasColumn('credit_cards', 'last4');
        if (hasLast4Column) {
            await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`last4\` \`last4\` varchar(4) NULL`); // Make it nullable again
            await queryRunner.dropColumn('credit_cards', 'last4'); // Then drop it
            console.log('Dropped last4 column from credit_cards during down migration.');
        } else {
            console.log('last4 column does not exist, skipping drop during down migration.');
        }

        // Revert isDefault column changes
        const hasIsDefaultColumn = await queryRunner.hasColumn('credit_cards', 'isDefault');
        if (hasIsDefaultColumn) {
            await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`isDefault\` \`isDefault\` tinyint(1) NULL`); // Make it nullable again
            await queryRunner.dropColumn('credit_cards', 'isDefault'); // Then drop it
            console.log('Dropped isDefault column from credit_cards during down migration.');
        } else {
            console.log('isDefault column does not exist, skipping drop during down migration.');
        }


        // Existing generated queries (in reverse order of up)
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`userId\` \`userId\` varchar(36) NULL`); // Assuming it was nullable before
        await queryRunner.query(`ALTER TABLE \`credit_cards\` DROP INDEX \`IDX_a358a26def849b562cd49465fd\``); // This index might have been dropped already or not exist
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`expiryYear\` \`expiryYear\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`credit_cards\` CHANGE \`expiryMonth\` \`expiryMonth\` int NULL`);
        
        // Re-add the foreign key as it was before (if needed, or simply omit if dropping table)
        await queryRunner.query(`ALTER TABLE \`credit_cards\` ADD CONSTRAINT \`FK_316ec479135fbc369ccf229dd0f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
