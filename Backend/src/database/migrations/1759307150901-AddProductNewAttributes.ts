import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductNewAttributes1759307150901 implements MigrationInterface {
    name = 'AddProductNewAttributes1759307150901';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // --- FIX 1: Use Backticks (`) for identifiers in MySQL ---
        // 'character varying' is a PostgreSQL type. Use 'VARCHAR(10)' for currency code in MySQL.
        await queryRunner.query(`
            ALTER TABLE \`product\` 
            ADD COLUMN \`currency\` VARCHAR(10) NOT NULL 
            DEFAULT 'USD'
        `);

        // --- FIX 2: Handle NOT NULL JSON in MySQL ---
        // When adding a NOT NULL column to an existing table, MySQL requires a DEFAULT value for existing rows.
        // We use the JSON_OBJECT function for a valid JSON default.
        await queryRunner.query(`
            ALTER TABLE \`product\` 
            ADD COLUMN \`productWeight\` JSON NOT NULL 
            DEFAULT (JSON_OBJECT('unit', 'lbs', 'value', 0)) 
        `);
        
        // IMPORTANT: If you want to use the entity's @BeforeInsert hook, 
        // you MUST make the column nullable OR provide a SQL default (as done above) 
        // for migrations to existing tables.
        
        // Since we provided a SQL default, the entity's @BeforeInsert hook will only 
        // run for new entities created through TypeORM, which is generally acceptable.
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop columns must also use backticks
        
        // 1. Drop 'productWeight' column
        await queryRunner.query(`
            ALTER TABLE \`product\` 
            DROP COLUMN \`productWeight\`
        `);

        // 2. Drop 'currency' column
        await queryRunner.query(`
            ALTER TABLE \`product\` 
            DROP COLUMN \`currency\`
        `);
    }
}