import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTagColumnsToSubcategoryEntities1759805538512 implements MigrationInterface {
    
    // Define the common tag columns to be added
    private readonly tagColumns = [
        new TableColumn({
            name: 'tags_required',
            type: 'text',
            isArray: true, // For TypeORM's 'simple-array' type, use 'text' with isArray: true for compatibility
            isNullable: true,
        }),
        new TableColumn({
            name: 'optional_tags',
            type: 'text',
            isArray: true,
            isNullable: true,
        }),
        new TableColumn({
            name: 'tag_defaults',
            type: 'json', // Use 'json' or 'jsonb' depending on your database (jsonb preferred for PostgreSQL)
            isNullable: true,
        }),
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add tag columns to the 'subcategory_item_child' table
        for (const column of this.tagColumns) {
            await queryRunner.addColumn('subcategory_item_child', column);
        }

        // 2. Add tag columns to the 'subcategory_item' table (if the entity was also updated)
        for (const column of this.tagColumns) {
            await queryRunner.addColumn('subcategory_item', column);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove tag columns from the 'subcategory_item_child' table
        await queryRunner.dropColumns('subcategory_item_child', [
            'tags_required',
            'optional_tags',
            'tag_defaults',
        ]);

        // 2. Remove tag columns from the 'subcategory_item' table
        await queryRunner.dropColumns('subcategory_item', [
            'tags_required',
            'optional_tags',
            'tag_defaults',
        ]);
    }

}