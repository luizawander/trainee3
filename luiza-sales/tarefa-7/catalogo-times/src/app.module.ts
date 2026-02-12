import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CitiesModule } from './cities/cities.module';
import { LeaguesModule } from './leagues/leagues.module';
import { TeamsModule } from './teams/teams.module';
import { ChampionsModule } from './champions/champions.module';

@Module({
  imports: [
    DatabaseModule, 
    CitiesModule,
    LeaguesModule, 
    TeamsModule,
    ChampionsModule,
  ],
})
export class AppModule {}