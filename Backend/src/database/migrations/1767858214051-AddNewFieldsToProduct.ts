import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFieldsToProduct1767858214051 implements MigrationInterface {
    name = 'AddNewFieldsToProduct1767858214051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product" 
            ADD "shape" character varying,
            ADD "pattern" character varying,
            ADD "pile_height" character varying,
            ADD "room_type" character varying,
            ADD "washable" boolean NOT NULL DEFAULT false,
            ADD "backing_type" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product" 
            DROP COLUMN "backing_type",
            DROP COLUMN "washable",
            DROP COLUMN "room_type",
            DROP COLUMN "pile_height",
            DROP COLUMN "pattern",
            DROP COLUMN "shape"
        `);
    }
}