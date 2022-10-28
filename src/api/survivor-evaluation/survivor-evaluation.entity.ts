import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Province } from '../province/province.entity';
import { Provider } from '../provider/provider.entity';

@Entity()
export class SurvivorEvaluation extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'integer'})
  @ApiProperty()
  public violenceType: number;

  @ManyToOne(() => Province)
  @JoinTable()
  @ApiProperty()
  public province: Province

  @ManyToOne(() => Provider)
  @JoinTable()
  @ApiProperty()
  public provider: Provider

  @Column({ type: 'varchar'})
  @ApiProperty()
  public place: string;

  @Column({ type: 'integer'})
  @ApiProperty()
  public phase: number;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public security: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public securityNotes: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public legalProtection: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public legalProtectionNotes: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public mentalWelfare: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public mentalWelfareNotes: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public financial: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public financialNotes: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public social: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public socialNotes: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public physical: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public physicalNotes: string;

  @Column({ type: 'integer'})
  @ApiProperty()
  public total: number;

  @Column({ type: 'integer'})
  @ApiProperty()
  public survivorStatus: number;

  @Column({ type: 'timestamp'})
  @ApiProperty()
  public createdAt: Date;

  @Column({ type: 'timestamp'})
  @ApiProperty()
  public completedAt: Date;

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public userInCharge: User

//  @ManyToOne(() => Case)
//  @JoinTable()
//  @ApiProperty()
//  public case: Case;
}
