import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameOptionalTagsToTagsOptional1767928358279 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Renames the column while preserving the underlying data and type
        await queryRunner.renameColumn(
            "subcategory_item_child", // The table name
            "optional_tags",          // The current name in the DB
            "tags_optional"           // The new name
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Allows you to revert the change if needed
        await queryRunner.renameColumn(
            "subcategory_item_child",
            "tags_optional",
            "optional_tags"
        );
    }

}