import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationsToSubcategoryItem1755861457844 implements MigrationInterface {
    name = 'AddRelationsToSubcategoryItem1755861457844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ✅ Add FK only if it doesn't already exist
        const [existingChildFk] = await queryRunner.query(`
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'subcategory_item_child'
              AND CONSTRAINT_SCHEMA = DATABASE()
              AND COLUMN_NAME = 'subcategoryItemId'
        `);

        if (!existingChildFk) {
            await queryRunner.query(`
                ALTER TABLE \`subcategory_item_child\`
                ADD CONSTRAINT \`FK_subcategoryItemChild_subcategoryItem\`
                FOREIGN KEY (\`subcategoryItemId\`) REFERENCES \`subcategory_item\`(\`id\`)
                ON DELETE CASCADE ON UPDATE NO ACTION
            `);
        }

        // ✅ Do the same for Product → SubcategoryItem
        const [existingProductFk] = await queryRunner.query(`
            SELECT CONSTRAINT_NAME
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = 'product'
              AND CONSTRAINT_SCHEMA = DATABASE()
              AND COLUMN_NAME = 'subcategoryItemId'
        `);

        if (!existingProductFk) {
            await queryRunner.query(`
                ALTER TABLE \`product\`
                ADD CONSTRAINT \`FK_product_subcategoryItem\`
                FOREIGN KEY (\`subcategoryItemId\`) REFERENCES \`subcategory_item\`(\`id\`)
                ON DELETE CASCADE ON UPDATE NO ACTION
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`subcategory_item_child\`
            DROP FOREIGN KEY \`FK_subcategoryItemChild_subcategoryItem\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`product\`
            DROP FOREIGN KEY \`FK_product_subcategoryItem\`
        `);
    }
}
