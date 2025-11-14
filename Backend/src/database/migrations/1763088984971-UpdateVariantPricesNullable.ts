import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateVariantPricesNullable1763088984971 implements MigrationInterface {

    name = 'UpdateVariantPricesNullable1763088984971'; // Update the number to a real timestamp

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Make 'price' column nullable
        await queryRunner.changeColumn('product_variant', 'price', new TableColumn({
            name: 'price',
            type: 'float',
            isNullable: true,
        }));

        // 2. Make 'salePrice' column nullable
        await queryRunner.changeColumn('product_variant', 'salePrice', new TableColumn({
            name: 'salePrice',
            type: 'float',
            isNullable: true,
        }));

        console.log('Successfully updated product_variant: price and salePrice columns set to nullable.');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // NOTE: Reverting to NOT NULL might fail if there are already NULL values in the database.

        // 1. Revert 'price' column to NOT NULL (Optional, usually omitted in production rollbacks)
        await queryRunner.changeColumn('product_variant', 'price', new TableColumn({
            name: 'price',
            type: 'float',
            isNullable: false,
        }));

        // 2. Revert 'salePrice' column to NOT NULL (Optional, usually omitted in production rollbacks)
        await queryRunner.changeColumn('product_variant', 'salePrice', new TableColumn({
            name: 'salePrice',
            type: 'float',
            isNullable: false,
        }));
        
        console.log('Reverted product_variant: price and salePrice columns set back to NOT NULL.');
    }

}