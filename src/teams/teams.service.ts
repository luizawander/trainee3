import { Injectable } from '@nestjs/common';
import { TeamsRepository } from './teams.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  create(createTeamDto: CreateTeamDto) {
    return this.teamsRepository.create(createTeamDto);
  }

  findAll() {
    return this.teamsRepository.findAll();
  }

  findOne(id: number) {
    return this.teamsRepository.findOne(id);
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamsRepository.update(id, updateTeamDto);
  }

  remove(id: number) {
    return this.teamsRepository.remove(id);
  }
}
