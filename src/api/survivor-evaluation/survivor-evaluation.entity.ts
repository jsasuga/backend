import { BaseEntity, Column, DeleteDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Province } from '../province/province.entity';
import { Provider } from '../provider/provider.entity';
import { Case } from '../case/case.entity';

@Entity()
export class SurvivorEvaluation extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public violenceType: number;

  @ManyToOne(() => Province)
  @JoinTable()
  @ApiProperty()
  public province: Province

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public place: string;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public phase: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public security1: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public security2: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public security3: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public securityNotes: string;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public legalProtection1: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public legalProtection2: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public legalProtection3: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public legalProtectionNotes: string;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public mentalWelfare1: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public mentalWelfare2: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public mentalWelfare3: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public mentalWelfare4: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public mentalWelfareNotes: string;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public financial1: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public financial2: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public financial3: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public financial4: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public financialNotes: string;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public social1: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public social2: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public social3: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public social4: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public socialNotes: string;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public physical1: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public physical2: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public physical3: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public physical4: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public physical5: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public physicalNotes: string;

  @Column({ type: 'decimal', nullable: true})
  @ApiProperty()
  public total: number;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public survivorStatus: number;

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public createdAt: Date;

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public completedAt: Date;

  @Column({ type: 'boolean', nullable: true})
  @ApiProperty()
  public completed: boolean;

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public userInCharge: User

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  public deletedAt?: Date

  @Column({ type: 'decimal', nullable: true})
  @ApiProperty()
  securityTotal: number;

  @Column({ type: 'decimal', nullable: true})
  @ApiProperty()
  legalProtectionTotal: number;
  
  @Column({ type: 'decimal', nullable: true})
  @ApiProperty()
  mentalWelfareTotal: number;
  
  @Column({ type: 'decimal', nullable: true})
  @ApiProperty()
  financial: number;
  
  @Column({ type: 'decimal', nullable: true})
  @ApiProperty()
  social: number
  
  @Column({ type: 'decimal', nullable: true})
  @ApiProperty()
  physical: number;
}
