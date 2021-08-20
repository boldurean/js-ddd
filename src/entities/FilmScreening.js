import { v4 as uuid } from 'uuid';
import ApplicationEntity from './ApplicationEntity.js';

export default class FilmScreening extends ApplicationEntity {
  constructor(film, cinemaHall, time) {
    super();
    this.id = uuid();
    this.film = film;
    this.cinemaHall = cinemaHall;
    this.time = time;
    this.createdAt = new Date();
  }
}
