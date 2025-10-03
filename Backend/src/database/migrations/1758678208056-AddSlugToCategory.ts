import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSlugToCategory1758678208056 implements MigrationInterface {
    name = 'AddSlugToCategory1758678208056';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "category",
            new TableColumn({
                name: "slug",
                type: "varchar",
                isNullable: true,
                isUnique: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("category", "slug");
    }
}
