import { Injectable } from '@nestjs/common';
import { LeaguesRepository } from './leagues.repository';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';

@Injectable()
export class LeaguesService {
  constructor(private readonly leaguesRepository: LeaguesRepository) {}

  create(createLeagueDto: CreateLeagueDto) {
    return this.leaguesRepository.create(createLeagueDto);
  }

  findAll() {
    return this.leaguesRepository.findAll();
  }

  findOne(id: number) {
    return this.leaguesRepository.findOne(id);
  }

  update(id: number, updateLeagueDto: UpdateLeagueDto) {
    return this.leaguesRepository.update(id, updateLeagueDto);
  }

  remove(id: number) {
    return this.leaguesRepository.remove(id);
  }
}
