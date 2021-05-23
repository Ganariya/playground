import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// tasks以下の入り口
// import で DB 周りを指定するらしい
// providers に当たるものは Service以外にも多いっぽい
@Module({
  imports: [TypeOrmModule.forFeature([Task])], // リポジトリのimport
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
