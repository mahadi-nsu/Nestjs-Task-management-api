import { Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      // if we have any query we return
      return this.tasksService.getTaskWithFilters(filterDto);
    }

    // otherwise we return all tasks
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  gettaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deletetaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe) //builtin validation
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status') 
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status' , TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateTask(id, status);
  }
}
