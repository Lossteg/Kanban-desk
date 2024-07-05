import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Status } from "./status.entity";

@Entity('desks')
export class Desk {
    @PrimaryGeneratedColumn()
    desk_id: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "varchar", length: 100, unique: true })
    avatar_path: string;
    
    @ManyToOne(() => User, (user) => user.desks)
    author = User;

    @OneToMany(() => Status, (status) => status.desk)
    statuses: Status[];
}