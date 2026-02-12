import { Injectable } from '@nestjs/common';
import { ChampionsRepository } from './champions.repository';
import { CreateChampionDto } from './dto/create-champion.dto';
import { UpdateChampionDto } from './dto/update-champion.dto';

@Injectable()
export class ChampionsService {
  constructor(private readonly championsRepository: ChampionsRepository) {}

  create(createChampionDto: CreateChampionDto) {
    return this.championsRepository.create(createChampionDto);
  }

  findAll() {
    return this.championsRepository.findAll();
  }

  findOne(id: number) {
    return this.championsRepository.findOne(id);
  }

  update(id: number, updateChampionDto: UpdateChampionDto) {
    return this.championsRepository.update(id, updateChampionDto);
  }

  remove(id: number) {
    return this.championsRepository.remove(id);
  }
}
