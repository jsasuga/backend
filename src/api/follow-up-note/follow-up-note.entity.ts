import { BaseEntity, Column, DeleteDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Case } from '../case/case.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class FollowUpNote extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public description: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public victimThoughts: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public observations: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public topics: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public comprehension: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public needs: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public survivorPlan: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public evaluatorPlan: string;

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public userInCharge: User;

  @ManyToOne(() => Case, (c) => c.followUpNotes)
  @Exclude()
  @JoinTable()
  public case: Case;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  public deletedAt?: Date

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public createdAt: Date;

}
