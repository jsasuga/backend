import { BaseEntity, Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Province } from '../province/province.entity';
import { ServiceType } from '../service-type/service-type.entity';
import { ProviderAreas } from '../provider-areas/provider-areas.entity';
import { Branch } from '../branch/branch.entity';

@Entity()
export class Provider extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar' })
  @ApiProperty()
  public name!: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public phoneNumber: string | null;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public email: string | null;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public address: string | null;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public description: string | null;

  // Service area of the providers
  @ManyToOne(() => Province)
  @JoinTable()
  @ApiProperty()
  public province: Province

  @ManyToMany(() => ServiceType)
  @JoinTable()
  @ApiProperty()
  public serviceTypes: ServiceType[];

  @ManyToMany(() => ProviderAreas)
  @JoinTable()
  @ApiProperty()
  public providerAreas: ProviderAreas[];

  // Provider network
  @Column({ type: 'integer', nullable: true })
  @ApiProperty()
  public networkInterest: number | null;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  public networkNeeds: string | null;

  @OneToMany(() => Branch, (branch) => branch.provider)
  @ApiProperty()
  @JoinTable()
  branches: Branch[]

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  public deletedAt?: Date
}
