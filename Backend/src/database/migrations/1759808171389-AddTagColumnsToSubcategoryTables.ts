import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTagColumnsToSubcategoryTables1759808171389 implements MigrationInterface {
    
    // Define the common tag columns to be added
    private readonly tagColumns = [
        new TableColumn({
            name: 'tags_required',
            type: 'text',
            isNullable: true,
        }),
        new TableColumn({
            name: 'optional_tags',
            type: 'text',
            isNullable: true,
        }),
        new TableColumn({
            name: 'tag_defaults',
            type: 'json', // Correct for MySQL
            isNullable: true,
        }),
    ];

    // Helper function to safely add a column (copied from the last correct answer)
    private async safeAddColumn(queryRunner: QueryRunner, tableName: string, column: TableColumn) {
        // This is the CRITICAL check
        const columnExists = await queryRunner.hasColumn(tableName, column.name); 
        
        if (!columnExists) {
            console.log(`Adding column ${column.name} to ${tableName}...`);
            await queryRunner.addColumn(tableName, column);
        } else {
            // If the column exists, we skip the ALTER TABLE command, preventing the error.
            console.log(`Column ${column.name} already exists in ${tableName}. Skipping.`);
        }
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableItem = 'subcategory_item';
        const tableItemChild = 'subcategory_item_child';

        // 1. Safely add tag columns to the 'subcategory_item' table
        for (const column of this.tagColumns) {
            await this.safeAddColumn(queryRunner, tableItem, column);
        }

        // 2. Safely add tag columns to the 'subcategory_item_child' table
        for (const column of this.tagColumns) {
            await this.safeAddColumn(queryRunner, tableItemChild, column);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Down logic remains the same (assuming TypeORM handles checking foreign keys correctly)
        const dropColumns = ['tags_required', 'optional_tags', 'tag_defaults'];

        await queryRunner.dropColumns('subcategory_item_child', dropColumns);
        await queryRunner.dropColumns('subcategory_item', dropColumns);
    }
}