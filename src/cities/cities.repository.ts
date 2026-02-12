import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCityDto: CreateCityDto) {
    const result = await this.databaseService.db.run(
      'INSERT INTO cities (name, country) VALUES (?, ?)',
      [createCityDto.name, createCityDto.country],
    );
    return this.findOne(result.lastID!);
  }

  async findAll() {
    return this.databaseService.db.all('SELECT * FROM cities');
  }

  async findOne(id: number) {
    return this.databaseService.db.get('SELECT * FROM cities WHERE id = ?', [id]);
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const fields: string[] = [];
    const values: any[] = [];

    if (updateCityDto.name !== undefined) {
      fields.push('name = ?');
      values.push(updateCityDto.name);
    }
    if (updateCityDto.country !== undefined) {
      fields.push('country = ?');
      values.push(updateCityDto.country);
    }

    if (fields.length === 0) {
      return this.findOne(id);
    }

    values.push(id);
    await this.databaseService.db.run(
      `UPDATE cities SET ${fields.join(', ')} WHERE id = ?`,
      values,
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.databaseService.db.run('DELETE FROM cities WHERE id = ?', [id]);
    return { deleted: true };
  }
}
