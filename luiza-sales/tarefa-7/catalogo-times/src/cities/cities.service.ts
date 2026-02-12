import { Injectable } from '@nestjs/common';
import { CitiesRepository } from './cities.repository';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(private readonly citiesRepository: CitiesRepository) {}

  create(createCityDto: CreateCityDto) {
    return this.citiesRepository.create(createCityDto);
  }

  findAll() {
    return this.citiesRepository.findAll();
  }

  findOne(id: number) {
    return this.citiesRepository.findOne(id);
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return this.citiesRepository.update(id, updateCityDto);
  }

  remove(id: number) {
    return this.citiesRepository.remove(id);
  }
}
