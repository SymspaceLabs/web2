import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationsToSubcategoryItem1755861457844 implements MigrationInterface {
    name = 'AddRelationsToSubcategoryItem1755861457844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // SubcategoryItemChild → SubcategoryItem (column already exists)
        await queryRunner.query(`
            ALTER TABLE \`subcategory_item_child\`
            ADD CONSTRAINT \`FK_subcategoryItemChild_subcategoryItem\`
            FOREIGN KEY (\`subcategoryItemId\`) REFERENCES \`subcategory_item\`(\`id\`)
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        // Product → SubcategoryItem (column already exists, so only add FK)
        await queryRunner.query(`
            ALTER TABLE \`product\`
            ADD CONSTRAINT \`FK_product_subcategoryItem\`
            FOREIGN KEY (\`subcategoryItemId\`) REFERENCES \`subcategory_item\`(\`id\`)
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Rollback Product relation (drop only FK)
        await queryRunner.query(`
            ALTER TABLE \`product\`
            DROP FOREIGN KEY \`FK_product_subcategoryItem\`
        `);

        // Rollback SubcategoryItemChild relation (drop only FK)
        await queryRunner.query(`
            ALTER TABLE \`subcategory_item_child\`
            DROP FOREIGN KEY \`FK_subcategoryItemChild_subcategoryItem\`
        `);
    }
}
