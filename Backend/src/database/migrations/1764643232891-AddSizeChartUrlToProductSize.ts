import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSizeChartUrlToProductSize1764643232891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ✅ Add the new sizeChartUrl column to the product_size table
        await queryRunner.addColumn(
            'product_size', // Table name (usually snake_case of the entity class name)
            new TableColumn({
                name: 'sizeChartUrl',
                type: 'varchar', // Use 'varchar' for storing a URL string
                isNullable: true, // Allows null, as not every size will have a unique chart
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ❌ Remove the sizeChartUrl column to reverse the migration
        await queryRunner.dropColumn(
            'product_size', // Table name
            'sizeChartUrl' // Column name
        );
    }

}