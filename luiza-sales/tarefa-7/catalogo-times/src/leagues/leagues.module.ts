import { Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { LeaguesRepository } from './leagues.repository';

@Module({
  controllers: [LeaguesController],
  providers: [LeaguesService, LeaguesRepository],
})
export class LeaguesModule {}
