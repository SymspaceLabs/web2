import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationsToSubcategoryItem1755861457844 implements MigrationInterface {
    name = 'AddRelationsToSubcategoryItem1755861457844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add foreign key from SubcategoryItemChild → SubcategoryItem
        await queryRunner.query(`
            ALTER TABLE \`subcategory_item_child\`
            ADD \`subcategoryItemId\` varchar(36) NULL
        `);

        await queryRunner.query(`
            ALTER TABLE \`subcategory_item_child\`
            ADD CONSTRAINT \`FK_subcategoryItemChild_subcategoryItem\`
            FOREIGN KEY (\`subcategoryItemId\`) REFERENCES \`subcategory_item\`(\`id\`)
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        // Add foreign key from Product → SubcategoryItem
        await queryRunner.query(`
            ALTER TABLE \`product\`
            ADD \`subcategoryItemId\` varchar(36) NULL
        `);

        await queryRunner.query(`
            ALTER TABLE \`product\`
            ADD CONSTRAINT \`FK_product_subcategoryItem\`
            FOREIGN KEY (\`subcategoryItemId\`) REFERENCES \`subcategory_item\`(\`id\`)
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Rollback Product relation
        await queryRunner.query(`
            ALTER TABLE \`product\`
            DROP FOREIGN KEY \`FK_product_subcategoryItem\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`product\`
            DROP COLUMN \`subcategoryItemId\`
        `);

        // Rollback SubcategoryItemChild relation
        await queryRunner.query(`
            ALTER TABLE \`subcategory_item_child\`
            DROP FOREIGN KEY \`FK_subcategoryItemChild_subcategoryItem\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`subcategory_item_child\`
            DROP COLUMN \`subcategoryItemId\`
        `);
    }
}
