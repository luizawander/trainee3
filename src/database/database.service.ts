import { Injectable, OnModuleInit } from '@nestjs/common';
import { Database } from 'sqlite';
import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public db: Database;

  async onModuleInit() {
    await this.connect();
    await this.createTables();
  }

  private async connect() {
    this.db = await open({
      filename: 'database.sqlite',
      driver: sqlite3.Database, 
    });
  }

  private async createTables() {
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS cities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        country TEXT NOT NULL
      )
    `);

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS leagues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('Nacional', 'Estadual', 'Continental', 'Mundial'))
      )
    `); 

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS teams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        city_id INTEGER,
        league_id INTEGER,
        FOREIGN KEY (city_id) REFERENCES cities (id),
        FOREIGN KEY (league_id) REFERENCES leagues (id)
      )
    `);

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS champions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        team_id INTEGER,
        league_id INTEGER,
        year INTEGER NOT NULL,
        FOREIGN KEY (team_id) REFERENCES teams (id),
        FOREIGN KEY (league_id) REFERENCES leagues (id)
      )
    `);
  }
}