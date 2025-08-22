import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubcategoryItemChildToProduct1755861838562 implements MigrationInterface {
    name = 'AddSubcategoryItemChildToProduct1755861838562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add the new nullable column to product
        await queryRunner.query(`
            ALTER TABLE \`product\`
            ADD \`subcategoryItemChildId\` varchar(36) NULL
        `);

        // 2. Add foreign key constraint to subcategory_item_child table
        await queryRunner.query(`
            ALTER TABLE \`product\`
            ADD CONSTRAINT \`FK_product_subcategoryItemChild\`
            FOREIGN KEY (\`subcategoryItemChildId\`) REFERENCES \`subcategory_item_child\`(\`id\`)
            ON DELETE SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Rollback: Drop foreign key + column
        await queryRunner.query(`
            ALTER TABLE \`product\`
            DROP FOREIGN KEY \`FK_product_subcategoryItemChild\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`product\`
            DROP COLUMN \`subcategoryItemChildId\`
        `);
    }
}
