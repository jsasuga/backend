import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Provider)
  @JoinTable()
  @ApiProperty()
  public provider: Provider

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public place: string;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public phase: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public security: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public securityNotes: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public legalProtection: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public legalProtectionNotes: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public mentalWelfare: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public mentalWelfareNotes: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public financial: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public financialNotes: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public social: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public socialNotes: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public physical: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public physicalNotes: string;

  @Column({ type: 'integer', nullable: true})
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

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public userInCharge: User

}
