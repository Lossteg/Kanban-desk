import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn()
    notification_id: number;

    @Column({ type:"varchar", length: 255 })
    content: string;

    @Column({ type:"varchar", length: 255 })
    type: string;

    @Column({type:"varchar", length: 512})
    args: string;

    @Column({ type: "bit", default: 0 })
    is_seen: number;

    @CreateDateColumn({ type: "timestamp with time zone" })
    send_date: Date;

    @ManyToOne(() => User)
    user: User;
}