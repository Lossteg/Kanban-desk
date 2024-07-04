import { User } from "src/user/entities/user.entity";
import { Comment } from "./comment.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { Status } from "src/desk/entities/status.entity";
import { Priority } from "./priority.entity";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    task_id: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "varchar", length: 1028 })
    description: string;
    
    @Column({ type: "timestamp with time zone", nullable: true })
    start_date: Date;

    @Column({ type: "timestamp with time zone", nullable: true })
    end_date: Date;

    @Column({ type:"varchar", length: 40 })
    tags: string[];

    @CreateDateColumn({ type: "timestamp with time zone" })
    publication_date: Date;

    @OneToMany(() => Comment, (comment) => comment.task)
    comments: Comment[];

    @ManyToOne(() => Priority)
    priority: Status;

    @ManyToOne(() => Status)
    status: Status;

    @ManyToOne(() => User)
    author: User;

    @ManyToMany(() => User, (user) => user.supervised_tasks)
    supervisors: User[];

    @ManyToMany(() => User, (user) => user.execution_tasks)
    performers: User[];
}