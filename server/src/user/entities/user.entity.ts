import { Desk } from "src/desk/entities/desk.entity";
import { Notification } from "src/notification/entities/notification.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: "varchar", length: 15 })
    first_name: string;

    @Column({ type: "varchar", length: 15 })
    last_name: string;

    @Column({ type: "varchar", length: 50, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @Column({ type: "varchar", length: 512, unique: true })
    avatar_path: string;

    @OneToMany(() => Desk, (desk) => desk.author)
    desks: Desk[];

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];

    @ManyToMany(() => Task, (task) => task.supervisors)
    supervised_tasks: Task[];

    @ManyToMany(() => Task, (task) => task.performers)
    execution_tasks: Task[];
}