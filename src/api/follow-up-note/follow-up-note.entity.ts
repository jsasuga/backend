import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Case } from '../case/case.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class FollowUpNote extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public description: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public victimThoughts: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public observations: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public topics: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public comprehension: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public needs: string;

  @Column({ type: 'varchar'})
  @ApiProperty()
  public survivorPlan: string;

  @Column({ type: 'varchar'})
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
}
