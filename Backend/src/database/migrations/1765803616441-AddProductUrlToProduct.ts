import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddProductUrlToProduct1765803616441 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("product", new TableColumn({
            name: "productUrl",
            type: "varchar",
            length: "255",
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("product", "productUrl");
    }

}
