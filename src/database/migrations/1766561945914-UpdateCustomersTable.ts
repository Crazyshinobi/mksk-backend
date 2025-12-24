import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCustomersTable1766561945914 implements MigrationInterface {
    name = 'UpdateCustomersTable1766561945914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`lender_group\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`borrower_group\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`borrower_group\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`lender_group\``);
    }

}
