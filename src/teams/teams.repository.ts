import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTeamDto: CreateTeamDto) {
    const result = await this.databaseService.db.run(
      'INSERT INTO teams (name, city_id, league_id) VALUES (?, ?, ?)',
      [createTeamDto.name, createTeamDto.city_id, createTeamDto.league_id],
    );
    return this.findOne(result.lastID!);
  }

  async findAll() {
    return this.databaseService.db.all(`
      SELECT 
        t.*,
        c.name as city_name,
        c.country as city_country,
        l.name as league_name,
        l.type as league_type,
        (SELECT COUNT(*) FROM champions WHERE team_id = t.id) as titles
      FROM teams t
      LEFT JOIN cities c ON t.city_id = c.id
      LEFT JOIN leagues l ON t.league_id = l.id
    `);
  }

  async findOne(id: number) {
    return this.databaseService.db.get(`
      SELECT 
        t.*,
        c.name as city_name,
        c.country as city_country,
        l.name as league_name,
        l.type as league_type,
        (SELECT COUNT(*) FROM champions WHERE team_id = t.id) as titles
      FROM teams t
      LEFT JOIN cities c ON t.city_id = c.id
      LEFT JOIN leagues l ON t.league_id = l.id
      WHERE t.id = ?
    `, [id]);
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const fields: string[] = [];
    const values: any[] = [];

    if (updateTeamDto.name !== undefined) {
      fields.push('name = ?');
      values.push(updateTeamDto.name);
    }
    if (updateTeamDto.city_id !== undefined) {
      fields.push('city_id = ?');
      values.push(updateTeamDto.city_id);
    }
    if (updateTeamDto.league_id !== undefined) {
      fields.push('league_id = ?');
      values.push(updateTeamDto.league_id);
    }

    if (fields.length === 0) {
      return this.findOne(id);
    }

    values.push(id);
    await this.databaseService.db.run(
      `UPDATE teams SET ${fields.join(', ')} WHERE id = ?`,
      values,
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.databaseService.db.run('DELETE FROM teams WHERE id = ?', [id]);
    return { deleted: true };
  }
}
