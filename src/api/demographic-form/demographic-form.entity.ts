import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Case } from '../case/case.entity';

@Entity()
export class DemographicForm extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public participation: string;

  @Column({ type: 'integer', nullable: true})
  @ApiProperty()
  public commitment: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public comments: string;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public description: string;

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public userInCharge: User;

}
