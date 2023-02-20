import { BaseEntity, Column, DeleteDateColumn, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Provider } from '../provider/provider.entity';
import { Victim } from '../victim/victim.entity';
import { DemographicForm } from '../demographic-form/demographic-form.entity';
import { SurvivorEvaluation } from '../survivor-evaluation/survivor-evaluation.entity';
import { AttentionProtocol } from '../attention-protocol/attention-protocol.entity';
import { FollowUp } from '../follow-up/follow-up.entity';
import { FollowUpNote } from '../follow-up-note/follow-up-note.entity';
import { Comment } from '../comment/comment.entity';

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

  @ManyToOne(() => User)
  @JoinTable()
  @ApiProperty()
  public consentUserInCharge: User;

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

  @OneToMany(() => FollowUp, (fu) => fu.case)
  @ApiProperty()
  @JoinTable()
  followUps: FollowUp[]

  @OneToMany(() => FollowUpNote, (fun) => fun.case)
  @ApiProperty()
  @JoinTable()
  followUpNotes: FollowUpNote[]
  
  @OneToMany(() => Comment, (c) => c.case)
  @ApiProperty()
  @JoinTable()
  comments: Comment[]

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, select: false })
  public deletedAt?: Date

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public code: string;

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public completedAt: Date;

  @Column({ type: 'boolean', nullable: true})
  @ApiProperty()
  public completed: boolean;

  @Column({ type: 'timestamp', nullable: true})
  @ApiProperty()
  public inactiveAt: Date;

  @Column({ type: 'boolean', nullable: true})
  @ApiProperty()
  public inactive: boolean;

  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public jurisdiction: string;
  
  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
	public defendant: string;
	
  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public defendantId: string;
  
  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public proceduralStage: string;
	
  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public legalScore: string;
  
  @Column({ type: 'varchar', nullable: true})
  @ApiProperty()
  public userCode: string;
}
