import { MigrationInterface, QueryRunner } from "typeorm";

export class IncrementingIds1730864703570 implements MigrationInterface {
    name = 'IncrementingIds1730864703570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "court" DROP CONSTRAINT "FK_5029375d36e05e108220ab3f55e"`);
        await queryRunner.query(`ALTER TABLE "court" DROP CONSTRAINT "PK_d8f2118c52b422b03e0331a7b91"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8f2118c52b422b03e0331a7b9"`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "court" ADD CONSTRAINT "PK_d8f2118c52b422b03e0331a7b91" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "parkId"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "parkId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "park" DROP CONSTRAINT "PK_653802406812552d8de5f9a4047"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_653802406812552d8de5f9a404"`);
        await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "park" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "park" ADD CONSTRAINT "PK_653802406812552d8de5f9a4047" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af1f96549b26bc9eb36f0afbaf"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "courtId"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "courtId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "parkId"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "parkId" integer NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d8f2118c52b422b03e0331a7b9" ON "court" ("id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_653802406812552d8de5f9a404" ON "park" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_af1f96549b26bc9eb36f0afbaf" ON "booking" ("courtId") `);
        await queryRunner.query(`ALTER TABLE "court" ADD CONSTRAINT "FK_5029375d36e05e108220ab3f55e" FOREIGN KEY ("parkId") REFERENCES "park"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_5083431c6d0b9cc3dc5869325f5" FOREIGN KEY ("parkId") REFERENCES "park"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_af1f96549b26bc9eb36f0afbafb" FOREIGN KEY ("courtId") REFERENCES "court"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_af1f96549b26bc9eb36f0afbafb"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_5083431c6d0b9cc3dc5869325f5"`);
        await queryRunner.query(`ALTER TABLE "court" DROP CONSTRAINT "FK_5029375d36e05e108220ab3f55e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af1f96549b26bc9eb36f0afbaf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_653802406812552d8de5f9a404"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8f2118c52b422b03e0331a7b9"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "parkId"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "parkId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "courtId"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "courtId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_af1f96549b26bc9eb36f0afbaf" ON "booking" ("courtId") `);
        await queryRunner.query(`ALTER TABLE "park" DROP CONSTRAINT "PK_653802406812552d8de5f9a4047"`);
        await queryRunner.query(`ALTER TABLE "park" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "park" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_653802406812552d8de5f9a404" ON "park" ("id") `);
        await queryRunner.query(`ALTER TABLE "park" ADD CONSTRAINT "PK_653802406812552d8de5f9a4047" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "parkId"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "parkId" uuid`);
        await queryRunner.query(`ALTER TABLE "court" DROP CONSTRAINT "PK_d8f2118c52b422b03e0331a7b91"`);
        await queryRunner.query(`ALTER TABLE "court" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "court" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d8f2118c52b422b03e0331a7b9" ON "court" ("id") `);
        await queryRunner.query(`ALTER TABLE "court" ADD CONSTRAINT "PK_d8f2118c52b422b03e0331a7b91" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "court" ADD CONSTRAINT "FK_5029375d36e05e108220ab3f55e" FOREIGN KEY ("parkId") REFERENCES "park"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
