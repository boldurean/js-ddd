import { v4 as uuid } from 'uuid';

export default class FilmScreening {
  constructor(film, cinemaHall, time) {
    this.id = uuid();
    this.film = film;
    this.cinemaHall = cinemaHall;
    this.time = time;
    this.createdAt = new Date();

    this.cinemaHall.addFilmScreenings(this);
  }
}
