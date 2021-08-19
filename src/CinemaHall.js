import { v4 as uuid } from 'uuid';

export default class CinemaHall {
  constructor(name, rows, cols) {
    this.id = uuid();
    this.name = name;
    this.rows = rows;
    this.cols = cols;
    this.filmScreenings = [];
    this.createdAt = new Date();
  }

  addFilmScreenings(filmScreen) {
    this.filmScreenings.push(filmScreen);
  }
}
