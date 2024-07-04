import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Desk } from "./desk.entity";

@Entity('statuses')
export class Status {
    @PrimaryGeneratedColumn()
    status_id : number;

    @Column({ type: "varchar", length: 64 })
    name: string;
    
    @Column({ type: "varchar", length: 7 })
    color: string;

    @ManyToOne(() => Desk, (desk) => desk.statuses)
    desk: Desk;
}