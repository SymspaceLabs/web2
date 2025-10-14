import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddExtendedProductVariantDetails1760444964314 implements MigrationInterface { 
    
    // The name of the table to be altered
    private readonly TABLE_NAME = 'product_variant';

    // Define the new columns with their types and constraints
    private readonly newVariantColumns = [
        new TableColumn({
            name: 'salePrice',
            type: 'float',
            isNullable: false, // Matches your entity, but we must provide a default
            default: 0.0,
        }),
        new TableColumn({
            name: 'productWeight',
            // Use 'jsonb' for PostgreSQL or 'json' for MySQL/MariaDB
            type: 'json', 
            isNullable: false, 
            default: `'{"unit": "lbs", "value": null}'`, // Default as a string literal
        }),
        new TableColumn({
            name: 'dimensions',
            // Use 'jsonb' for PostgreSQL or 'json' for MySQL/MariaDB
            type: 'json', 
            isNullable: false, 
            default: `'{"unit": "cm", "length": null, "width": null, "height": null}'`, // Default as a string literal
        }),
        new TableColumn({
            name: 'sizeChart',
            type: 'varchar',
            isNullable: true,
        }),
        new TableColumn({
            name: 'sizeFit',
            type: 'text',
            isNullable: true,
        }),
    ];

    /**
     * Helper function to safely add a column (copied from your example)
     */
    private async safeAddColumn(queryRunner: QueryRunner, tableName: string, column: TableColumn) {
        const columnExists = await queryRunner.hasColumn(tableName, column.name); 
        
        if (!columnExists) {
            console.log(`Adding column ${column.name} to ${tableName}...`);
            await queryRunner.addColumn(tableName, column);
        } else {
            console.log(`Column ${column.name} already exists in ${tableName}. Skipping.`);
        }
    }

    /**
     * Apply the migration (add the columns)
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const column of this.newVariantColumns) {
            await this.safeAddColumn(queryRunner, this.TABLE_NAME, column);
        }
    }

    /**
     * Revert the migration (remove the columns)
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        const dropColumns = this.newVariantColumns.map(col => col.name);

        // TypeORM's dropColumns method handles existence checks internally
        await queryRunner.dropColumns(this.TABLE_NAME, dropColumns);
    }
}