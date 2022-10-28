import { BaseEntity, Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Provider } from '../provider/provider.entity';
import { Victim } from '../victim/victim.entity';
import { DemographicForm } from '../demographic-form/demographic-form.entity';
import { SurvivorEvaluation } from '../survivor-evaluation/survivor-evaluation.entity';
import { AttentionProtocol } from '../attention-protocol/attention-protocol.entity';
import { FollowUpNote } from '../follow-up-note/follow-up-note.entity';

@Entity()
export class Case extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id!: number;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public description: string;

  @ManyToOne(() => Victim)
  @JoinTable()
  @ApiProperty()
  public victim: Victim;

  @ManyToOne(() => Provider)
  @JoinTable()
  @ApiProperty()
  public provider: Provider;

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public userInCharge: User;

  @Column({ type: 'boolean', nullable: true})
  @ApiProperty()
  public consent: boolean;

  @ManyToOne(() => DemographicForm)
  @ApiProperty()
  @JoinTable()
  public demographicForm: DemographicForm;

  @ManyToOne(() => SurvivorEvaluation)
  @ApiProperty()
  @JoinTable()
  public initialSurvivorEvaluation: SurvivorEvaluation;

  @ManyToOne(() => SurvivorEvaluation)
  @ApiProperty()
  @JoinTable()
  public finalSurvivorEvaluation: SurvivorEvaluation;

  @ManyToOne(() => SurvivorEvaluation)
  @ApiProperty()
  @JoinTable()
  public postSurvivorEvaluation: SurvivorEvaluation;

  @ManyToOne(() => AttentionProtocol)
  @ApiProperty()
  @JoinTable()
  public attentionProtocol: AttentionProtocol;

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public followUpUserInCharge: User;

  @OneToMany(() => FollowUpNote, (fun) => fun.case)
  @ApiProperty()
  @JoinTable()
  followUpNotes: FollowUpNote[]
}
