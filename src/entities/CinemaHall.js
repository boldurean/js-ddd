import { v4 as uuid } from 'uuid';
import ApplicationEntity from './ApplicationEntity.js';

export default class CinemaHall extends ApplicationEntity {
  constructor(name, rows, cols) {
    super();
    this.id = uuid();
    this.name = name;
    this.rows = rows;
    this.cols = cols;
    this.createdAt = new Date();
  }
}
