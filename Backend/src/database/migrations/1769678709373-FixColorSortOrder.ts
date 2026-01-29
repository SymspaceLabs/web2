import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixColorSortOrder1769678709373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔄 Starting color sortOrder fix...');

    // Get all unique product IDs
    const products = await queryRunner.query(`
      SELECT DISTINCT productId 
      FROM product_color 
      ORDER BY productId
    `);

    console.log(`📦 Found ${products.length} products with colors`);

    let totalUpdated = 0;

    // For each product, update colors with sequential sortOrder
    for (const product of products) {
      // Get all colors for this product, ordered by creation date
      const colors = await queryRunner.query(`
        SELECT id, name
        FROM product_color
        WHERE productId = ?
        ORDER BY createdAt ASC, id ASC
      `, [product.productId]);

      // Update each color with its index as sortOrder
      for (let i = 0; i < colors.length; i++) {
        await queryRunner.query(`
          UPDATE product_color
          SET sortOrder = ?
          WHERE id = ?
        `, [i, colors[i].id]);
        
        totalUpdated++;
      }

      console.log(`  ✓ Updated ${colors.length} colors for product ${product.productId}`);
    }

    console.log(`✅ Successfully updated ${totalUpdated} colors across ${products.length} products`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert all sortOrder back to 0
    await queryRunner.query(`
      UPDATE product_color 
      SET sortOrder = 0
    `);
    
    console.log('⬇️ Reverted all color sortOrder values to 0');
  }
}