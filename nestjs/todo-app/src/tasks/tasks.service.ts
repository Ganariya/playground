import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskPropertyDto } from './dto/task-property.dto';
import { Task } from './task.entity';

// Entity をもとに書くサービス層
// クリーンアーキテクチャだと Application にちかいイメージ（体感）

@Injectable()
export class TasksService {
  // DBに接続している
  // Repositoryを挟んでいるので疎結合でうれしい（SQLがなにか　中身が同実装されているか？を気にしなくて良い）
  // データの取り出し方 find findOne などは TypeORM側で実装されている
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  // Controller にやってきた Dto{title, description}　を検証されたあとで受け取る
  async createTask(taskPropertyDto: TaskPropertyDto): Promise<Task> {
    const { title, description } = taskPropertyDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = 'OPEN';

    try {
      await this.taskRepository.save(task);
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTask(id: number, status: string): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
