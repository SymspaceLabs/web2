import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddShouldersArmLengthShoeSizeToMeasurement1753160140865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add 'shoulders' column
        await queryRunner.addColumn(
            "measurement", // Table name
            new TableColumn({
                name: "shoulders",
                type: "float",
                isNullable: true, // As per your entity definition
            }),
        );

        // Add 'armLength' column
        await queryRunner.addColumn(
            "measurement", // Table name
            new TableColumn({
                name: "armLength",
                type: "float",
                isNullable: true, // As per your entity definition
            }),
        );

        // Add 'shoeSize' column
        await queryRunner.addColumn(
            "measurement", // Table name
            new TableColumn({
                name: "shoeSize",
                type: "float",
                isNullable: true, // As per your entity definition
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop 'shoeSize' column (in reverse order of addition for safety)
        await queryRunner.dropColumn("measurement", "shoeSize");

        // Drop 'armLength' column
        await queryRunner.dropColumn("measurement", "armLength");

        // Drop 'shoulders' column
        await queryRunner.dropColumn("measurement", "shoulders");
    }

}
