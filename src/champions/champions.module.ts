import { Module } from '@nestjs/common';
import { ChampionsService } from './champions.service';
import { ChampionsController } from './champions.controller';
import { ChampionsRepository } from './champions.repository';

@Module({
  controllers: [ChampionsController],
  providers: [ChampionsService, ChampionsRepository],
})
export class ChampionsModule {}
