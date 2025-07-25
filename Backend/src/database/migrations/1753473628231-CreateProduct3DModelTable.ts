import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct3DModelTable1753473628231 implements MigrationInterface {

      public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`product_3d_model\` (
                \`productId\` varchar(255) NOT NULL,
                \`mediaId\` varchar(255) NOT NULL,
                INDEX \`IDX_product\` (\`productId\`),
                INDEX \`IDX_media\` (\`mediaId\`),
                PRIMARY KEY (\`productId\`, \`mediaId\`),
                CONSTRAINT \`FK_product\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE,
                CONSTRAINT \`FK_media\` FOREIGN KEY (\`mediaId\`) REFERENCES \`media\`(\`id\`) ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`product_3d_model\``);
    }

}
