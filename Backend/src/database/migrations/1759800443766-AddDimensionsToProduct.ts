import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDimensionsToProduct1759800443766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add the 'dimensions' column (Existing Logic)
        await queryRunner.addColumn(
            'product',
            new TableColumn({
                name: 'dimensions',
                type: 'json', 
                isNullable: true, 
            }),
        );
        
        // 2. MODIFY THE 'composition' COLUMN to be nullable (Fixing previous error)
        // We use queryRunner.changeColumn to modify the existing column
        await queryRunner.changeColumn(
            'product', 
            'composition',
            new TableColumn({
                name: 'composition',
                type: 'varchar', // Assuming type is VARCHAR/string
                isNullable: true, // Set to true to allow null values
            }),
        );

        // 3. MODIFY THE 'sizeChart' COLUMN to be nullable (Addressing your request)
        await queryRunner.changeColumn(
            'product', 
            'sizeChart',
            new TableColumn({
                name: 'sizeChart',
                type: 'varchar', // Assuming type is VARCHAR/string
                isNullable: true, // Set to true to allow null values
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Drop the 'dimensions' column
        await queryRunner.dropColumn('product', 'dimensions');
        
        // 2. Revert 'composition' to its previous state (e.g., NOT NULL if required)
        // NOTE: This will fail if existing rows have NULL values. Leaving it as 'isNullable: true' on down 
        // is often safer if you don't intend to delete or backfill data.
        // For completeness, if you want it to mirror the initial strict schema:
        /*
        await queryRunner.changeColumn(
             'product', 
             'composition',
             new TableColumn({ name: 'composition', type: 'varchar', isNullable: false }),
         );
         */
         
        // 3. Revert 'sizeChart' to its previous state (same note as above)
        /*
        await queryRunner.changeColumn(
             'product', 
             'sizeChart',
             new TableColumn({ name: 'sizeChart', type: 'varchar', isNullable: false }),
         );
         */
    }
}