import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNicknameToBlogs1753178979138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the 'nickname' column to the 'blogs' table
        await queryRunner.addColumn(
            "blogs", // Table name
            new TableColumn({
                name: "nickname", // Column name
                type: "varchar", // Data type, e.g., 'varchar' for string
                length: "1000", // Max length as defined in the entity
                isNullable: true, // Allow null values as defined in the entity
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the 'nickname' column from the 'blogs' table if rolling back
        await queryRunner.dropColumn("blogs", "nickname");
    }

}
