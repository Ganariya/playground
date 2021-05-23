import { IsNotEmpty } from 'class-validator';

// 入力に対するバリデーション
// DTO は データをまとめるもの
// 一つのデータごとにまとめてきちんと入力が正しいか検証する
export class TaskPropertyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
