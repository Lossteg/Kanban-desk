import { Desk } from 'src/desk/entities/desk.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 15, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 512, unique: true, nullable: true })
  avatar_path: string;

  @OneToMany(() => Desk, (desk) => desk.author)
  desks: Desk[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @ManyToMany(() => Task, (task) => task.supervisors)
  supervised_tasks: Task[];

  @ManyToMany(() => Task, (task) => task.performers)
  execution_tasks: Task[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    if (!/^\$2[abxy]?\$\d+\$/.test(this.password)) {
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
