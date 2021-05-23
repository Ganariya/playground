import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Entity が DB の行に相当
// DBのために存在する　単体だけで　いい感じにDBを作ってくれる
@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;
}
