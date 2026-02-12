import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';

@Injectable()
export class LeaguesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLeagueDto: CreateLeagueDto) {
    const result = await this.databaseService.db.run(
      'INSERT INTO leagues (name, type) VALUES (?, ?)',
      [createLeagueDto.name, createLeagueDto.type],
    );
    return this.findOne(result.lastID!);
  }

  async findAll() {
    return this.databaseService.db.all('SELECT * FROM leagues');
  }

  async findOne(id: number) {
    return this.databaseService.db.get('SELECT * FROM leagues WHERE id = ?', [id]);
  }

  async update(id: number, updateLeagueDto: UpdateLeagueDto) {
    const fields: string[] = [];
    const values: any[] = [];

    if (updateLeagueDto.name !== undefined) {
      fields.push('name = ?');
      values.push(updateLeagueDto.name);
    }
    if (updateLeagueDto.type !== undefined) {
      fields.push('type = ?');
      values.push(updateLeagueDto.type);
    }

    if (fields.length === 0) {
      return this.findOne(id);
    }

    values.push(id);
    await this.databaseService.db.run(
      `UPDATE leagues SET ${fields.join(', ')} WHERE id = ?`,
      values,
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.databaseService.db.run('DELETE FROM leagues WHERE id = ?', [id]);
    return { deleted: true };
  }
}
