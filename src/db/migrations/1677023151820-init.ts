import {MigrationInterface, QueryRunner} from "typeorm";

export class init1677023151820 implements MigrationInterface {
    name = 'init1677023151820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "province" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "deleted_at" TIMESTAMP, CONSTRAINT "PK_4f461cb46f57e806516b7073659" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "deleted_at" TIMESTAMP, CONSTRAINT "PK_0a11a8d444eff1346826caed987" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider_areas" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "deleted_at" TIMESTAMP, CONSTRAINT "PK_b23c1f434e9f63b7ab0849f6f11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phoneNumber" character varying, "email" character varying, "address" character varying, "description" character varying, "networkInterest" integer, "networkNeeds" character varying, "deleted_at" TIMESTAMP, "provinceId" integer, CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "personInCharge" character varying, "address" character varying NOT NULL, "email" character varying, "phoneNumber" character varying NOT NULL, "latitude" numeric, "longitude" numeric, "deleted_at" TIMESTAMP, "providerId" integer, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "module" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "deleted_at" TIMESTAMP, CONSTRAINT "PK_0e20d657f968b051e674fbe3117" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "deleted_at" TIMESTAMP, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "victim" ("id" bigint NOT NULL, "name" character varying, "email" character varying NOT NULL, "otherName" character varying, "age" integer, "verifiedAge" character varying, "birthday" date, "citizenship" character varying, "ethnicity" character varying, "nationality" character varying, "maritalStatus" integer, "children" integer, "originAddress" character varying, "originCountry" character varying, "currentAddress" character varying, "phoneNumber" character varying, "preferredLanguage" character varying, "genre" integer, "deleted_at" TIMESTAMP, CONSTRAINT "PK_cbd7710a474d5b794f5711232da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "userCode" character varying, "lastName" character varying, "lastLoginAt" TIMESTAMP, "deleted_at" TIMESTAMP, "roleId" integer, "providerId" integer, "victimId" bigint, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "demographic_form" ("id" SERIAL NOT NULL, "participation" character varying, "commitment" integer, "comments" character varying, "description" character varying, "completedAt" TIMESTAMP, "completed" boolean, "createdAt" TIMESTAMP, "deleted_at" TIMESTAMP, "userInChargeId" integer, CONSTRAINT "PK_9dcd70e7dce2e12758ae1aa29ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "survivor_evaluation" ("id" SERIAL NOT NULL, "violenceType" integer, "place" character varying, "phase" integer, "security1" integer, "security2" integer, "security3" integer, "securityNotes" character varying, "legalProtection1" integer, "legalProtection2" integer, "legalProtection3" integer, "legalProtectionNotes" character varying, "mentalWelfare1" integer, "mentalWelfare2" integer, "mentalWelfare3" integer, "mentalWelfare4" integer, "mentalWelfareNotes" character varying, "financial1" integer, "financial2" integer, "financial3" integer, "financial4" integer, "financialNotes" character varying, "social1" integer, "social2" integer, "social3" integer, "social4" integer, "socialNotes" character varying, "physical1" integer, "physical2" integer, "physical3" integer, "physical4" integer, "physical5" integer, "physicalNotes" character varying, "total" numeric, "survivorStatus" integer, "createdAt" TIMESTAMP, "completedAt" TIMESTAMP, "completed" boolean, "deleted_at" TIMESTAMP, "securityTotal" numeric, "legalProtectionTotal" numeric, "mentalWelfareTotal" numeric, "financial" numeric, "social" numeric, "physical" numeric, "provinceId" integer, "userInChargeId" integer, CONSTRAINT "PK_a30b086fd9ee8405498917eb2a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attention_protocol" ("id" SERIAL NOT NULL, "data" character varying, "confidentiality" boolean, "consent" boolean, "treatment" boolean, "security" character varying, "legalProtection" character varying, "mental" character varying, "financial" character varying, "social" character varying, "physical" character varying, "strengths" character varying, "comments" character varying, "completedAt" TIMESTAMP, "completed" boolean, "createdAt" TIMESTAMP, "deleted_at" TIMESTAMP, "userInChargeId" integer, CONSTRAINT "PK_bcf914bcbc3a69c5ec39c76f07b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follow_up" ("id" SERIAL NOT NULL, "date" TIMESTAMP, "decisions" character varying, "lawyer" character varying, "tribunal" character varying, "nextAudienceDate" TIMESTAMP, "canceled" boolean, "cancelledReason" character varying, "deleted_at" TIMESTAMP, "createdAt" TIMESTAMP, "caseId" integer, CONSTRAINT "PK_5c0a5f5b32937e47e0ab09d596c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follow_up_note" ("id" SERIAL NOT NULL, "description" character varying, "victimThoughts" character varying, "observations" character varying, "topics" character varying, "comprehension" character varying, "needs" character varying, "survivorPlan" character varying, "evaluatorPlan" character varying, "deleted_at" TIMESTAMP, "createdAt" TIMESTAMP, "dueDate" TIMESTAMP, "completedAt" TIMESTAMP, "completed" boolean, "userInChargeId" integer, "caseId" integer, CONSTRAINT "PK_9270840b1639ada06f24b32ebcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "createdAt" TIMESTAMP, "deleted_at" TIMESTAMP, "userId" integer, "caseId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "case" ("id" SERIAL NOT NULL, "description" character varying, "consent" boolean, "createdAt" TIMESTAMP, "deleted_at" TIMESTAMP, "code" character varying, "completedAt" TIMESTAMP, "completed" boolean, "inactiveAt" TIMESTAMP, "inactive" boolean, "jurisdiction" character varying, "defendant" character varying, "defendantId" character varying, "proceduralStage" character varying, "legalScore" character varying, "userCode" character varying, "victimId" bigint, "providerId" integer, "userInChargeId" integer, "consentUserInChargeId" integer, "demographicFormId" integer, "initialSurvivorEvaluationId" integer, "finalSurvivorEvaluationId" integer, "postSurvivorEvaluationId" integer, "attentionProtocolId" integer, "followUpUserInChargeId" integer, CONSTRAINT "PK_a1b20a2aef6fc438389d2c4aca0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider_service_types_service_type" ("providerId" integer NOT NULL, "serviceTypeId" integer NOT NULL, CONSTRAINT "PK_84ce9953b02ce83d45bf6b61204" PRIMARY KEY ("providerId", "serviceTypeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f59cc915e1eb9024d101084140" ON "provider_service_types_service_type" ("providerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_392a0e715c43fc935767b44561" ON "provider_service_types_service_type" ("serviceTypeId") `);
        await queryRunner.query(`CREATE TABLE "provider_provider_areas_provider_areas" ("providerId" integer NOT NULL, "providerAreasId" integer NOT NULL, CONSTRAINT "PK_bf4c8fbdc4640015b76c7918771" PRIMARY KEY ("providerId", "providerAreasId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_277b8acda6189802fa51b4ccdb" ON "provider_provider_areas_provider_areas" ("providerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6a9e3745bf6c67bd3605e7f679" ON "provider_provider_areas_provider_areas" ("providerAreasId") `);
        await queryRunner.query(`CREATE TABLE "role_permissions_module" ("roleId" integer NOT NULL, "moduleId" integer NOT NULL, CONSTRAINT "PK_64a02c86fb9b35d9e079ef2c11e" PRIMARY KEY ("roleId", "moduleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6d69cb0c903584683a0bbacf03" ON "role_permissions_module" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea9d05f2625c68bcd72995734c" ON "role_permissions_module" ("moduleId") `);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_0d75c59bc539df3d7b2275b9711" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_a7db751493142f28b361a35224f" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0ad4792ebd254550ad4fdb55d6b" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d0d2292eb3b402c68a7e2e5d169" FOREIGN KEY ("victimId") REFERENCES "victim"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "demographic_form" ADD CONSTRAINT "FK_80e400d7ade73ee4167a2727a0d" FOREIGN KEY ("userInChargeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survivor_evaluation" ADD CONSTRAINT "FK_90d794c805aee080ffebc502711" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survivor_evaluation" ADD CONSTRAINT "FK_1a320ed536db2395a2779b20f8b" FOREIGN KEY ("userInChargeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attention_protocol" ADD CONSTRAINT "FK_c43eec30a0099953ea1092ea301" FOREIGN KEY ("userInChargeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_up" ADD CONSTRAINT "FK_c148c285fa83711d6428d8b1eae" FOREIGN KEY ("caseId") REFERENCES "case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_up_note" ADD CONSTRAINT "FK_5dce73f7fc955966a0cb8b5bfbe" FOREIGN KEY ("userInChargeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_up_note" ADD CONSTRAINT "FK_1c6161851a17a52bcff0a8332e1" FOREIGN KEY ("caseId") REFERENCES "case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_6c37ac5b602a495d0d3dd5cd7b5" FOREIGN KEY ("caseId") REFERENCES "case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "case" ADD CONSTRAINT "FK_601219a0ee75603d0b1ea40473e" FOREIGN KEY ("victimId") REFERENCES "victim"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "case" ADD CONSTRAINT "FK_e1a5ffc00abea85209a33a8e655" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "case" ADD CONSTRAINT "FK_4266b4d20efcc21a1239a87f3d0" FOREIGN KEY ("userInChargeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "case" ADD CONSTRAINT "FK_1ddf3aeddcffbc7d11d8742f554" FOREIGN KEY ("consentUserInChargeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "case" ADD CONSTRAINT "FK_eb83bc3a24892ae166aa2ff6911" FOREIGN KEY ("demographicFormId") REFERENCES "demographic_form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "case" ADD CONSTRAINT "FK_bd6fe42115717163b4bc48201dc" FOREIGN KEY ("initialSurvivorEvaluationId") REFERENCES "survivor_evaluation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "case" ADD CONSTRAINT "FK_24b7bbf433c1e1b410927dd231f" FOREIGN KEY ("finalSurvivorEvaluationId") REFERENCES "survivor_evaluation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "case" ADD CONSTRAINT "FK_0b0d6c758a64dc873186ca7bb5d" FOREIGN KEY ("postSurvivorEvaluationId") REFERENCES "survivor_evaluation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "case" ADD CONSTRAINT "FK_8608cf4b0a5a391ac8f51d44eb1" FOREIGN KEY ("attentionProtocolId") REFERENCES "attention_protocol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "case" ADD CONSTRAINT "FK_64143bd4974c3963098b07dc0b8" FOREIGN KEY ("followUpUserInChargeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "provider_service_types_service_type" ADD CONSTRAINT "FK_f59cc915e1eb9024d1010841400" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "provider_service_types_service_type" ADD CONSTRAINT "FK_392a0e715c43fc935767b44561c" FOREIGN KEY ("serviceTypeId") REFERENCES "service_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "provider_provider_areas_provider_areas" ADD CONSTRAINT "FK_277b8acda6189802fa51b4ccdb4" FOREIGN KEY ("providerId") REFERENCES "provider"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "provider_provider_areas_provider_areas" ADD CONSTRAINT "FK_6a9e3745bf6c67bd3605e7f6798" FOREIGN KEY ("providerAreasId") REFERENCES "provider_areas"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions_module" ADD CONSTRAINT "FK_6d69cb0c903584683a0bbacf03c" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions_module" ADD CONSTRAINT "FK_ea9d05f2625c68bcd72995734c7" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permissions_module" DROP CONSTRAINT "FK_ea9d05f2625c68bcd72995734c7"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_module" DROP CONSTRAINT "FK_6d69cb0c903584683a0bbacf03c"`);
        await queryRunner.query(`ALTER TABLE "provider_provider_areas_provider_areas" DROP CONSTRAINT "FK_6a9e3745bf6c67bd3605e7f6798"`);
        await queryRunner.query(`ALTER TABLE "provider_provider_areas_provider_areas" DROP CONSTRAINT "FK_277b8acda6189802fa51b4ccdb4"`);
        await queryRunner.query(`ALTER TABLE "provider_service_types_service_type" DROP CONSTRAINT "FK_392a0e715c43fc935767b44561c"`);
        await queryRunner.query(`ALTER TABLE "provider_service_types_service_type" DROP CONSTRAINT "FK_f59cc915e1eb9024d1010841400"`);
        await queryRunner.query(`ALTER TABLE "case" DROP CONSTRAINT "FK_64143bd4974c3963098b07dc0b8"`);
        await queryRunner.query(`ALTER TABLE "case" DROP CONSTRAINT "FK_8608cf4b0a5a391ac8f51d44eb1"`);
        await queryRunner.query(`ALTER TABLE "case" DROP CONSTRAINT "FK_0b0d6c758a64dc873186ca7bb5d"`);
        await queryRunner.query(`ALTER TABLE "case" DROP CONSTRAINT "FK_24b7bbf433c1e1b410927dd231f"`);
        await queryRunner.query(`ALTER TABLE "case" DROP CONSTRAINT "FK_bd6fe42115717163b4bc48201dc"`);
        await queryRunner.query(`ALTER TABLE "case" DROP CONSTRAINT "FK_eb83bc3a24892ae166aa2ff6911"`);
        await queryRunner.query(`ALTER TABLE "case" DROP CONSTRAINT "FK_1ddf3aeddcffbc7d11d8742f554"`);
        await queryRunner.query(`ALTER TABLE "case" DROP CONSTRAINT "FK_4266b4d20efcc21a1239a87f3d0"`);
        await queryRunner.query(`ALTER TABLE "case" DROP CONSTRAINT "FK_e1a5ffc00abea85209a33a8e655"`);
        await queryRunner.query(`ALTER TABLE "case" DROP CONSTRAINT "FK_601219a0ee75603d0b1ea40473e"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_6c37ac5b602a495d0d3dd5cd7b5"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "follow_up_note" DROP CONSTRAINT "FK_1c6161851a17a52bcff0a8332e1"`);
        await queryRunner.query(`ALTER TABLE "follow_up_note" DROP CONSTRAINT "FK_5dce73f7fc955966a0cb8b5bfbe"`);
        await queryRunner.query(`ALTER TABLE "follow_up" DROP CONSTRAINT "FK_c148c285fa83711d6428d8b1eae"`);
        await queryRunner.query(`ALTER TABLE "attention_protocol" DROP CONSTRAINT "FK_c43eec30a0099953ea1092ea301"`);
        await queryRunner.query(`ALTER TABLE "survivor_evaluation" DROP CONSTRAINT "FK_1a320ed536db2395a2779b20f8b"`);
        await queryRunner.query(`ALTER TABLE "survivor_evaluation" DROP CONSTRAINT "FK_90d794c805aee080ffebc502711"`);
        await queryRunner.query(`ALTER TABLE "demographic_form" DROP CONSTRAINT "FK_80e400d7ade73ee4167a2727a0d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d0d2292eb3b402c68a7e2e5d169"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0ad4792ebd254550ad4fdb55d6b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_a7db751493142f28b361a35224f"`);
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "FK_0d75c59bc539df3d7b2275b9711"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea9d05f2625c68bcd72995734c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6d69cb0c903584683a0bbacf03"`);
        await queryRunner.query(`DROP TABLE "role_permissions_module"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a9e3745bf6c67bd3605e7f679"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_277b8acda6189802fa51b4ccdb"`);
        await queryRunner.query(`DROP TABLE "provider_provider_areas_provider_areas"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_392a0e715c43fc935767b44561"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f59cc915e1eb9024d101084140"`);
        await queryRunner.query(`DROP TABLE "provider_service_types_service_type"`);
        await queryRunner.query(`DROP TABLE "case"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "follow_up_note"`);
        await queryRunner.query(`DROP TABLE "follow_up"`);
        await queryRunner.query(`DROP TABLE "attention_protocol"`);
        await queryRunner.query(`DROP TABLE "survivor_evaluation"`);
        await queryRunner.query(`DROP TABLE "demographic_form"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "victim"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "module"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "provider_areas"`);
        await queryRunner.query(`DROP TABLE "service_type"`);
        await queryRunner.query(`DROP TABLE "province"`);
    }

}