import { MigrationInterface, QueryRunner } from "typeorm";
import { SeederService } from "../seeders/seeder.service";
import { AppDataSource } from "src/data-source"; // 👈 reuse your config
import { Category } from "src/categories/entities/category.entity";
import { Subcategory } from "src/subcategories/entities/subcategory.entity";
import { SubcategoryItem } from "src/subcategory-items/entities/subcategory-item.entity";
import { SubcategoryItemChild } from "src/subcategory-item-child/entities/subcategory-item-child.entity";
import { Blog } from "src/blogs/entities/blog.entity";

export class SeedCategoriesAndBlogs1756000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dataSource = AppDataSource; // 👈 use the same DataSource
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    const seeder = new SeederService(
      dataSource,
      dataSource.getRepository(Category),
      dataSource.getRepository(Subcategory),
      dataSource.getRepository(SubcategoryItem),
      dataSource.getRepository(SubcategoryItemChild),
      // dataSource.getRepository(Blog)
    );

    await seeder.seed();

    // don’t destroy here, migration runner might still need it
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM blog`);
    await queryRunner.query(`DELETE FROM subcategory_item_child`);
    await queryRunner.query(`DELETE FROM subcategory_item`);
    await queryRunner.query(`DELETE FROM subcategory`);
    await queryRunner.query(`DELETE FROM category`);
  }
}
