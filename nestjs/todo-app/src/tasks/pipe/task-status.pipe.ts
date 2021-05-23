import { BadRequestException, PipeTransform } from '@nestjs/common';

// Status に対するパイプ
// パイプラインも入力に対する検証だがよりメソッドに近い検証
export class TaskStatusPipe implements PipeTransform {
  readonly allowStatus = ['OPEN', 'PROGRESS', 'DONE'];

  transform(value: string): string {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException();
    }

    return value;
  }

  private isStatusValid(status: string): Boolean {
    const result = this.allowStatus.indexOf(status);
    return result !== -1;
  }
}
