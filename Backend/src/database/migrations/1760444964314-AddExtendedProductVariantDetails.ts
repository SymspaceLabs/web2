import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddExtendedProductVariantDetails1760444964314 implements MigrationInterface { 
    
    // The name of the table to be altered
    private readonly TABLE_NAME = 'product_variant';

    // Define the new columns with their types and constraints
    // NOTE: JSON column definitions here are the *desired final state* but cannot be created in a single step.
    private readonly newVariantColumns = [
        new TableColumn({
            name: 'salePrice',
            type: 'float',
            isNullable: false, 
            default: 0.0,
        }),
        new TableColumn({
            name: 'productWeight',
            type: 'json', 
            isNullable: false, 
            default: '{"unit": "lbs", "value": null}',
        }),
        new TableColumn({
            name: 'dimensions',
            type: 'json', 
            isNullable: false, 
            default: '{"unit": "cm", "length": null, "width": null, "height": null}',
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
     * Apply the migration (add the columns)
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        
        // 1. Add simple columns first (salePrice, sizeChart, sizeFit)
        const simpleColumns = this.newVariantColumns.filter(col => col.name !== 'productWeight' && col.name !== 'dimensions');
        for (const column of simpleColumns) {
            const columnExists = await queryRunner.hasColumn(this.TABLE_NAME, column.name); 
            if (!columnExists) {
                 console.log(`Adding column ${column.name} to ${this.TABLE_NAME}...`);
                 await queryRunner.addColumn(this.TABLE_NAME, column);
            }
        }

        // 2. Handle JSON column: productWeight
        await this.addJsonColumnSafely(
            queryRunner, 
            'productWeight', 
            '{"unit": "lbs", "value": null}'
        );

        // 3. Handle JSON column: dimensions
        await this.addJsonColumnSafely(
            queryRunner, 
            'dimensions', 
            '{"unit": "cm", "length": null, "width": null, "height": null}'
        );

    }

    /**
     * Helper to add NOT NULL JSON columns in three steps to avoid MySQL error.
     */
    private async addJsonColumnSafely(queryRunner: QueryRunner, columnName: string, defaultValueJson: string): Promise<void> {
        const columnExists = await queryRunner.hasColumn(this.TABLE_NAME, columnName);
        
        if (columnExists) {
            console.log(`Column ${columnName} already exists in ${this.TABLE_NAME}. Skipping.`);
            return;
        }

        console.log(`Adding JSON column ${columnName} in stages to ${this.TABLE_NAME}...`);
        
        // Step 1: Add the JSON column as NULLABLE (temp)
        await queryRunner.addColumn(
            this.TABLE_NAME,
            new TableColumn({
                name: columnName,
                type: 'json',
                isNullable: true,
            })
        );
        
        // Step 2: Update existing rows with the desired default JSON value
        await queryRunner.query(
            `UPDATE ${this.TABLE_NAME} SET ${columnName} = ? WHERE ${columnName} IS NULL`,
            [defaultValueJson]
        );

        // Step 3: Change the column to NOT NULL
        await queryRunner.changeColumn(
            this.TABLE_NAME,
            columnName,
            new TableColumn({
                name: columnName,
                type: 'json',
                isNullable: false, // Final state: NOT NULL
            })
        );

        console.log(`JSON column ${columnName} successfully added as NOT NULL.`);
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