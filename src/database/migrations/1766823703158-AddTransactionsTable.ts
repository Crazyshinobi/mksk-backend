import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTransactionsTable1766823703158 implements MigrationInterface {
    name = 'AddTransactionsTable1766823703158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`transaction_type\` enum ('S', 'M') NOT NULL, \`transaction_number_type\` enum ('1', '2') NOT NULL, \`transaction_date\` date NOT NULL, \`month\` varchar(255) NOT NULL, \`amount_in_thousands\` decimal(15,2) NOT NULL, \`a_p_status\` enum ('advanced', 'past') NOT NULL, \`interest_recieved\` decimal(15,2) NOT NULL DEFAULT '0.00', \`interest_paid\` decimal(15,2) NOT NULL DEFAULT '0.00', \`comission_percentage\` json NOT NULL, \`remarks\` text NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`company_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction_lenders\` (\`transaction_id\` int NOT NULL, \`customer_id\` int NOT NULL, INDEX \`IDX_17156e9c705b2d31be83ce80ba\` (\`transaction_id\`), INDEX \`IDX_cabdd255d804161b2073cf6155\` (\`customer_id\`), PRIMARY KEY (\`transaction_id\`, \`customer_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction_borrowers\` (\`transaction_id\` int NOT NULL, \`customer_id\` int NOT NULL, INDEX \`IDX_dc28a4fc4d5c6871eff09b3003\` (\`transaction_id\`), INDEX \`IDX_07dd2dad0319cafbd37c9a4d07\` (\`customer_id\`), PRIMARY KEY (\`transaction_id\`, \`customer_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_8733562c5e54c31dd1ba8f49915\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction_lenders\` ADD CONSTRAINT \`FK_17156e9c705b2d31be83ce80bab\` FOREIGN KEY (\`transaction_id\`) REFERENCES \`transactions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`transaction_lenders\` ADD CONSTRAINT \`FK_cabdd255d804161b2073cf61551\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`transaction_borrowers\` ADD CONSTRAINT \`FK_dc28a4fc4d5c6871eff09b30032\` FOREIGN KEY (\`transaction_id\`) REFERENCES \`transactions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`transaction_borrowers\` ADD CONSTRAINT \`FK_07dd2dad0319cafbd37c9a4d07b\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction_borrowers\` DROP FOREIGN KEY \`FK_07dd2dad0319cafbd37c9a4d07b\``);
        await queryRunner.query(`ALTER TABLE \`transaction_borrowers\` DROP FOREIGN KEY \`FK_dc28a4fc4d5c6871eff09b30032\``);
        await queryRunner.query(`ALTER TABLE \`transaction_lenders\` DROP FOREIGN KEY \`FK_cabdd255d804161b2073cf61551\``);
        await queryRunner.query(`ALTER TABLE \`transaction_lenders\` DROP FOREIGN KEY \`FK_17156e9c705b2d31be83ce80bab\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_8733562c5e54c31dd1ba8f49915\``);
        await queryRunner.query(`DROP INDEX \`IDX_07dd2dad0319cafbd37c9a4d07\` ON \`transaction_borrowers\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc28a4fc4d5c6871eff09b3003\` ON \`transaction_borrowers\``);
        await queryRunner.query(`DROP TABLE \`transaction_borrowers\``);
        await queryRunner.query(`DROP INDEX \`IDX_cabdd255d804161b2073cf6155\` ON \`transaction_lenders\``);
        await queryRunner.query(`DROP INDEX \`IDX_17156e9c705b2d31be83ce80ba\` ON \`transaction_lenders\``);
        await queryRunner.query(`DROP TABLE \`transaction_lenders\``);
        await queryRunner.query(`DROP TABLE \`transactions\``);
    }

}
