import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCustomersTable1766304601771 implements MigrationInterface {
    name = 'AddCustomersTable1766304601771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`is_borrower\` tinyint NOT NULL DEFAULT 0, \`is_lender\` tinyint NOT NULL DEFAULT 0, \`is_active\` tinyint NOT NULL DEFAULT 1, \`full_name\` varchar(255) NOT NULL, \`email_address\` varchar(255) NOT NULL, \`mobile_number\` varchar(255) NOT NULL, \`alternate_mobile_number\` varchar(255) NULL, \`pan_number\` varchar(255) NULL, \`aadhar_number\` varchar(255) NULL, \`address\` text NULL, \`business_name\` varchar(255) NULL, \`gst_number\` varchar(255) NULL, \`business_address\` text NULL, \`nature_of_business\` varchar(255) NULL, \`type_of_business\` varchar(255) NULL, \`company_pan_number\` varchar(255) NULL, \`bank_name\` varchar(255) NULL, \`account_number\` varchar(255) NULL, \`ifsc_code\` varchar(255) NULL, \`branch_name\` varchar(255) NULL, \`city\` varchar(255) NULL, \`account_holder_name\` varchar(255) NULL, \`pan_card_path\` varchar(255) NULL, \`aadhar_path\` varchar(255) NULL, \`company_pan_path\` varchar(255) NULL, \`visiting_card_path\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`company_id\` int NOT NULL, UNIQUE INDEX \`IDX_7c45b625d7a179409a90f485ce\` (\`email_address\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD CONSTRAINT \`FK_f0e29920aaf871f3eddbea69f0d\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` DROP FOREIGN KEY \`FK_f0e29920aaf871f3eddbea69f0d\``);
        await queryRunner.query(`DROP INDEX \`IDX_7c45b625d7a179409a90f485ce\` ON \`customers\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}
