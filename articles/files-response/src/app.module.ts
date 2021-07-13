import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';

import { VolumeEntity } from './library/volume.entity';
import { LibraryModule } from './library/library.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: `postgres`,
      password: `postgres`,
      username: `postgres`,
      dropSchema: true,
      entities: [VolumeEntity],
      synchronize: true,
      logging: false,
    }),
    LibraryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
