import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixColorSortOrder1769678709373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Get all products with their colors
    const products = await queryRunner.query(`
      SELECT DISTINCT productId 
      FROM product_color 
      ORDER BY productId
    `);

    // For each product, update colors with sequential sortOrder based on creation date
    for (const product of products) {
      await queryRunner.query(`
        SET @row_number = -1;
        
        UPDATE product_color
        SET sortOrder = (@row_number := @row_number + 1)
        WHERE productId = ?
        ORDER BY createdAt ASC, id ASC
      `, [product.productId]);
    }

    console.log(`✅ Updated sortOrder for colors across ${products.length} products`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert all sortOrder back to 0
    await queryRunner.query(`
      UPDATE product_color 
      SET sortOrder = 0
    `);
  }
}