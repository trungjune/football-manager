import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../users/user.entity";
import { Member } from "../members/member.entity";

@Entity()
export class TeamTemplate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class TeamGenerationHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "json" })
  teams: {
    teamName: string;
    members: {
      id: string;
      name: string;
      skill: number;
      position?: string;
    }[];
    totalSkill: number;
  }[];

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
