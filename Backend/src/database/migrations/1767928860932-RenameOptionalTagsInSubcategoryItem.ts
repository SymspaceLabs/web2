import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameOptionalTagsInSubcategoryItem1767928860932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Renames the column for the SubcategoryItem table
        await queryRunner.renameColumn(
            "subcategory_item", // The table name (verify if it's snake_case in your DB)
            "optional_tags",     // Old name
            "tags_optional"      // New name
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert the change
        await queryRunner.renameColumn(
            "subcategory_item",
            "tags_optional",
            "optional_tags"
        );
    }
}