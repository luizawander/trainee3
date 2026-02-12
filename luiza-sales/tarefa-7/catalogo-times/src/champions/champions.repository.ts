import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateChampionDto } from './dto/create-champion.dto';
import { UpdateChampionDto } from './dto/update-champion.dto';

@Injectable()
export class ChampionsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createChampionDto: CreateChampionDto) {
    const result = await this.databaseService.db.run(
      'INSERT INTO champions (team_id, league_id, year) VALUES (?, ?, ?)',
      [createChampionDto.team_id, createChampionDto.league_id, createChampionDto.year],
    );
    return this.findOne(result.lastID!);
  }

  async findAll() {
    return this.databaseService.db.all(`
      SELECT 
        ch.*,
        t.name as team_name,
        l.name as league_name,
        l.type as league_type
      FROM champions ch
      LEFT JOIN teams t ON ch.team_id = t.id
      LEFT JOIN leagues l ON ch.league_id = l.id
    `);
  }

  async findOne(id: number) {
    return this.databaseService.db.get(`
      SELECT 
        ch.*,
        t.name as team_name,
        l.name as league_name,
        l.type as league_type
      FROM champions ch
      LEFT JOIN teams t ON ch.team_id = t.id
      LEFT JOIN leagues l ON ch.league_id = l.id
      WHERE ch.id = ?
    `, [id]);
  }

  async update(id: number, updateChampionDto: UpdateChampionDto) {
    const fields: string[] = [];
    const values: any[] = [];

    if (updateChampionDto.team_id !== undefined) {
      fields.push('team_id = ?');
      values.push(updateChampionDto.team_id);
    }
    if (updateChampionDto.league_id !== undefined) {
      fields.push('league_id = ?');
      values.push(updateChampionDto.league_id);
    }
    if (updateChampionDto.year !== undefined) {
      fields.push('year = ?');
      values.push(updateChampionDto.year);
    }

    if (fields.length === 0) {
      return this.findOne(id);
    }

    values.push(id);
    await this.databaseService.db.run(
      `UPDATE champions SET ${fields.join(', ')} WHERE id = ?`,
      values,
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.databaseService.db.run('DELETE FROM champions WHERE id = ?', [id]);
    return { deleted: true };
  }
}
