import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReadStream, writeFileSync } from 'fs';

import { VolumeEntity } from './volume.entity';
import { ToBookTransformer } from './to-book-transformer';

@Injectable()
export class LibraryService implements OnModuleInit {
  constructor(
    @InjectRepository(VolumeEntity)
    private readonly volumesRepository: Repository<VolumeEntity>,
  ) {}

  async getAll() {
    const rows = await this.volumesRepository
      .createQueryBuilder(`vols`)
      .select(`*`)
      .stream();

    return rows.pipe(new ToBookTransformer());
  }

  getFromStorage() {
    return createReadStream(__dirname + '/storage.csv', {
      encoding: 'utf-8',
    });
  }

  async onModuleInit() {
    await this.volumesRepository.insert([
      {
        isbn: '0-5018-4109-1',
        title: `Lord of the Rings 1`,
      },
      {
        isbn: '0-4221-6988-9',
        title: `Lord of the Rings 2`,
      },
      {
        isbn: '0-9557-4103-3',
        title: `Lord of the Rings 3`,
      },
      {
        isbn: '0-3066-6754-1',
        title: `Lord of the Rings 4`,
      },
    ]);

    writeFileSync(
      __dirname + '/storage.csv',
      [
        'isbn,title',
        '0-5018-4109-1,Lord of the Rings 5',
        '0-4221-6988-9,Lord of the Rings 6',
        '0-9557-4103-3,Lord of the Rings 7',
        '0-3066-6754-1,Lord of the Rings 8',
      ].join('\n'),
    );
  }
}
