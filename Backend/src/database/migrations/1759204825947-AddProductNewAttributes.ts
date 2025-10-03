import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddProductNewAttributes1759204825947 implements MigrationInterface {

    // --- UP MIGRATION ---
    // Adds the new columns to the 'product' table
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Define the new columns to be added
        const newColumns = [
            new TableColumn({
                name: 'occasion',
                type: 'varchar', // Default for string columns
                isNullable: true,
            }),
            new TableColumn({
                name: 'season',
                type: 'varchar',
                isNullable: true,
            }),
            new TableColumn({
                name: 'age_group',
                type: 'varchar',
                isNullable: true,
            }),
            new TableColumn({
                name: 'ar_type',
                type: 'varchar',
                isNullable: true,
            }),
            new TableColumn({
                name: 'indoor_outdoor',
                type: 'varchar',
                isNullable: true,
            }),
            new TableColumn({
                name: 'material',
                type: 'varchar',
                isNullable: true,
            }),
            new TableColumn({
                name: 'style',
                type: 'varchar',
                isNullable: true,
            }),
            new TableColumn({
                name: 'accessible',
                type: 'boolean',
                default: false, // Matches your entity definition
            }),
            new TableColumn({
                name: 'safety_certified',
                type: 'boolean',
                default: false, // Matches your entity definition
            }),
        ];

        // Add all columns sequentially
        for (const column of newColumns) {
            await queryRunner.addColumn('product', column);
        }
    }

    // --- DOWN MIGRATION ---
    // Reverts the changes by dropping the added columns
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Define the column names to be dropped
        const columnNamesToDrop = [
            'occasion',
            'season',
            'age_group',
            'ar_type',
            'indoor_outdoor',
            'material',
            'style',
            'accessible',
            'safety_certified',
        ];
        
        // Drop all columns sequentially
        for (const columnName of columnNamesToDrop) {
            // Check if the column exists before trying to drop it (a good practice for robustness)
            const table = await queryRunner.getTable('product');
            const column = table.columns.find(col => col.name === columnName);

            if (column) {
                await queryRunner.dropColumn('product', columnName);
            }
        }
    }
}