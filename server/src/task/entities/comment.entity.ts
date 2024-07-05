import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Task } from "./task.entity";
import { User } from "src/user/entities/user.entity";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    comment_id: number;

    @Column({ type: "varchar", length: 2056 })
    content: string;

    @CreateDateColumn({ type: "timestamp with time zone" })
    publication_date: Date;

    @ManyToOne(() => Task, (task) => task.comments)
    task = Task;

    @ManyToOne(() => User)
    author = User;
}