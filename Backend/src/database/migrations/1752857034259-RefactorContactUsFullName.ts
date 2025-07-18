import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RefactorContactUsFullName1752857034259 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add the new 'fullName' column
        await queryRunner.addColumn(
            'contact_us', // Table name
            new TableColumn({
                name: 'fullName',
                type: 'varchar',
                length: '200', // Matches the length in your entity
                isNullable: false, // Assuming fullName is mandatory
                default: "''" // Provide a default value for existing rows if not nullable
            }),
        );

        // 2. Migrate existing data (IMPORTANT: ONLY if you have existing data you want to preserve)
        // This will concatenate firstName and lastName into fullName
        // Adjust CONCAT logic if firstName or lastName can be NULL (e.g., use COALESCE)
        await queryRunner.query(
            `UPDATE contact_us SET fullName = CONCAT(firstName, ' ', lastName) WHERE firstName IS NOT NULL AND lastName IS NOT NULL`
        );
        await queryRunner.query(
            `UPDATE contact_us SET fullName = firstName WHERE firstName IS NOT NULL AND lastName IS NULL`
        );
        await queryRunner.query(
            `UPDATE contact_us SET fullName = lastName WHERE firstName IS NULL AND lastName IS NOT NULL`
        );


        // 3. Drop the old 'firstName' and 'lastName' columns
        await queryRunner.dropColumn('contact_us', 'firstName');
        await queryRunner.dropColumn('contact_us', 'lastName');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // In case of rollback (down migration), add back the old columns
        // 1. Add back 'firstName' and 'lastName' columns
        await queryRunner.addColumn(
            'contact_us',
            new TableColumn({
                name: 'firstName',
                type: 'varchar',
                length: '100',
                isNullable: true, // Assuming they were nullable before, adjust as per your original schema
            }),
        );
        await queryRunner.addColumn(
            'contact_us',
            new TableColumn({
                name: 'lastName',
                type: 'varchar',
                length: '100',
                isNullable: true, // Assuming they were nullable before, adjust as per your original schema
            }),
        );

        // 2. Migrate data back (IMPORTANT: This is a simplistic split, may not be perfect for all names)
        // This attempts to split fullName back into firstName and lastName.
        // Be aware that splitting a full name back into first and last can be lossy or inaccurate
        // for complex names or names without spaces.
        await queryRunner.query(
            `UPDATE contact_us SET firstName = SUBSTRING_INDEX(fullName, ' ', 1), lastName = SUBSTRING_INDEX(fullName, ' ', -1) WHERE fullName IS NOT NULL`
        );

        // 3. Drop the 'fullName' column
        await queryRunner.dropColumn('contact_us', 'fullName');
    }

}