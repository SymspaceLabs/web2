// Create this migration file in your NestJS project:
// src/migrations/TIMESTAMP-AddTextureToProduct3DModel.ts

import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTextureToProduct3DModel1768890756570 implements MigrationInterface {
    name = 'AddTextureToProduct3DModel1768890756570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add texture column to product_3d_model table
        await queryRunner.addColumn('product_3d_model', new TableColumn({
            name: 'texture',
            type: 'varchar',
            length: '500',
            isNullable: true,
            comment: 'URL of the texture image for the 3D model'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove texture column if rolling back
        await queryRunner.dropColumn('product_3d_model', 'texture');
    }
}