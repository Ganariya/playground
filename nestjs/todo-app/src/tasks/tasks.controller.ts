import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskPropertyDto } from './dto/task-property.dto';
import { TaskStatusPipe } from './pipe/task-status.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

// コントローラはやってきた通信を変換して Servicesにわたす
// Services がロジック的役割
// クライアントに返す値は指定しなければJSONになるっぽい
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // パイプラインでバリデーションするときにつける
  // DTO はデータを貯める場所でStructみたいに引数をとれる　かつ　検証できる
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() taskPropertyDto: TaskPropertyDto): Promise<Task> {
    return this.tasksService.createTask(taskPropertyDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: string,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, status);
  }

  // @Get()
  // getTasks() {
  //   return 'Tasks';
  // }
  // @Get('/:id')
  // getTaskById(@Param('id', ParseIntPipe) id: number) {
  //   return `getTaskById [id:${id}]`;
  // }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() taskPropertyDto: TaskPropertyDto) {
  //   const { title, description } = taskPropertyDto;
  //   return `createTask Success! Prameter [title:${title}, descritpion:${description}]`;
  // }
  // @Delete('/:id')
  // deleteTask(@Param('id', ParseIntPipe) id: number) {
  //   return `delete Task[id:${id}]`;
  // }
  // @Patch('/:id')
  // updateTask(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('status', TaskStatusPipe) status: string,
  // ) {
  //   return `updateTask [id:${id}, status:${status}]`;
  // }
}
