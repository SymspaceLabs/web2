import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';

export class UpdateProductGenderToArray1765184600686 implements MigrationInterface {

    private readonly tableName = 'product';
    private readonly oldColumnName = 'gender';
    private readonly newColumnName = 'gender'; // Same name, but new type
    private readonly temporaryOldColumnName = 'gender_old_enum';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table = await queryRunner.getTable(this.tableName);

        // 1. Rename the existing 'gender' column (single enum) to a temporary name
        await queryRunner.renameColumn(this.tableName, this.oldColumnName, this.temporaryOldColumnName);

        // 2. Add the new 'gender' column with type 'simple-array' (or 'text' for PostgreSQL simple-array)
        await queryRunner.addColumn(this.tableName, new TableColumn({
            name: this.newColumnName,
            type: 'text', // TypeORM uses 'text' for simple-array under the hood for many DBs
            isNullable: true,
        }));

        // 3. Data Migration (Optional but Recommended): 
        // Move existing valid single gender values into the new array column format.
        // This is complex for a simple-array as the migration is database-specific.
        // For MySQL, a simple-array stores comma-separated values.
        // For existing non-NULL values, we wrap them in an array string.
        await queryRunner.query(`
            UPDATE ${this.tableName} 
            SET ${this.newColumnName} = CONCAT('${'\{'}', ${this.temporaryOldColumnName}, '${'\}'}') 
            WHERE ${this.temporaryOldColumnName} IS NOT NULL
        `);
        
        // ⚠️ NOTE: The exact SQL for simple-array migration depends heavily on your database (e.g., MySQL vs PostgreSQL).
        // The above is a generic example. For production, you must test this specific query.

        // 4. Drop the old temporary column
        await queryRunner.dropColumn(this.tableName, this.temporaryOldColumnName);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table: Table = await queryRunner.getTable(this.tableName);

        // 1. Rename the current array 'gender' column to a temporary name
        await queryRunner.renameColumn(this.tableName, this.newColumnName, this.temporaryOldColumnName);

        // 2. Re-add the old 'gender' column as an enum
        const enumValues = ['men', 'women', 'boys', 'girls', 'unisex'];
        
        await queryRunner.addColumn(this.tableName, new TableColumn({
            name: this.oldColumnName,
            type: 'enum',
            enum: enumValues,
            isNullable: true,
        }));

        // 3. Data Reversion (Optional): 
        // Migrate data back by taking the first element of the array (if array type) 
        // or just copying the value (if it was somehow kept as a single string).
        
        // This is highly discouraged and often leads to data loss (e.g., losing all but one gender). 
        // We will leave the reversion query out to prevent accidental data corruption, 
        // as downgrades are typically not designed for data preservation in this scenario.

        // 4. Drop the temporary array column
        await queryRunner.dropColumn(this.tableName, this.temporaryOldColumnName);
    }
}