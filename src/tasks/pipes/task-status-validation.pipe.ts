import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    console.log(value);
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(` "${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    console.log(index);
    return index !== -1;
  }
}
