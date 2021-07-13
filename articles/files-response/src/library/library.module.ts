import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryService } from './library.service';
import { VolumeEntity } from './volume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VolumeEntity])],
  providers: [LibraryService],
  exports: [LibraryService],
})
export class LibraryModule {}
