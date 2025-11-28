import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCostAndMaterialToProductVariant1764147386972 implements MigrationInterface {

    name = 'AddCostAndMaterialToProductVariant1764147386972'; // Note: The number will be a timestamp when generated.

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the 'cost' column
        await queryRunner.addColumn(
            'product_variant', // The name of your table in the database
            new TableColumn({
                name: 'cost',
                type: 'float',
                isNullable: true, // Matches your Entity definition
            }),
        );

        // Add the 'material' column
        await queryRunner.addColumn(
            'product_variant', // The name of your table in the database
            new TableColumn({
                name: 'material',
                type: 'varchar', // Standard type for string/text data
                isNullable: true, // Matches your Entity definition
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the 'material' column (for rollback)
        await queryRunner.dropColumn('product_variant', 'material');
        
        // Remove the 'cost' column (for rollback)
        await queryRunner.dropColumn('product_variant', 'cost');
    }

}