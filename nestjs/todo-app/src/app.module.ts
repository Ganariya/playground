import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm-config.service';

@Module({
  imports: [
    // Moduleを読み込む
    TasksModule,
    TypeOrmModule.forRootAsync({
      // 非同期に設定を読み込むために必要っぽい
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    // 全体のモジュールの設定
    ConfigModule.forRoot({
      // process.env.NODE_ENV の値で読み込みファイルを変える
      // 先に読み込んだ変数ほど優先される
      envFilePath: [`.env/${process.env.NODE_ENV}.env`, '.env/default.env'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
