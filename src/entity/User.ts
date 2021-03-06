import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'text', unique: true })
  email: string
  @Column('text')
  password: string
}
