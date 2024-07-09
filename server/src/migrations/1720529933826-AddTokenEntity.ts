import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTokenEntity1720529933826 implements MigrationInterface {
    name = 'AddTokenEntity1720529933826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tokens" ("token_id" SERIAL NOT NULL, "token" character varying(512) NOT NULL, "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "revoked_at" TIMESTAMP WITH TIME ZONE, "is_revoked" boolean NOT NULL DEFAULT false, "userUserId" integer, CONSTRAINT "UQ_6a8ca5961656d13c16c04079dd3" UNIQUE ("token"), CONSTRAINT "PK_de8dcea5d0b08d61d5ad1cf8575" PRIMARY KEY ("token_id"))`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_d94e478145bb596788ec9ff1b2f" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_d94e478145bb596788ec9ff1b2f"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
    }

}
