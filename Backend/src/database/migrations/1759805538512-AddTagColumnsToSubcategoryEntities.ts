import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTagColumnsToSubcategoryEntities1759805538512 implements MigrationInterface {
    
    // Define the common tag columns to be added
    private readonly tagColumns = [
        new TableColumn({
            name: 'tags_required',
            type: 'text',
            // 🔥 FIX: REMOVE isArray: true for MySQL/simple-array
            isNullable: true,
        }),
        new TableColumn({
            name: 'optional_tags',
            type: 'text',
            // 🔥 FIX: REMOVE isArray: true for MySQL/simple-array
            isNullable: true,
        }),
        new TableColumn({
            name: 'tag_defaults',
            type: 'json', // Correct for MySQL
            isNullable: true,
        }),
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add tag columns to the 'subcategory_item_child' table
        // Use queryRunner.addColumns for atomicity and simplicity
        await queryRunner.addColumns('subcategory_item_child', this.tagColumns);
        
        // 2. Add tag columns to the 'subcategory_item' table
        await queryRunner.addColumns('subcategory_item', this.tagColumns);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ... (down method is correct)
        await queryRunner.dropColumns('subcategory_item_child', [
            'tags_required',
            'optional_tags',
            'tag_defaults',
        ]);

        await queryRunner.dropColumns('subcategory_item', [
            'tags_required',
            'optional_tags',
            'tag_defaults',
        ]);
    }
}