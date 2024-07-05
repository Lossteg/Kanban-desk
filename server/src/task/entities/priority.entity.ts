import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('priorities')
export class Priority {
    @PrimaryGeneratedColumn()
    priority_id: number

    @Column({ type:"varchar", length: 32 })
    name: string

    @Column({ type:"varchar", length: 7 })
    color: string
}