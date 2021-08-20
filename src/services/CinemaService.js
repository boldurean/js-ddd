import ApplicationService from './ApplicationService.js';

export default class CinemaService extends ApplicationService {
  createCinemaHall(name, rows, cols) {
    const cinemaHall = new this.entities.CinemaHall(name, rows, cols);
    const errors = this.validate(cinemaHall);
    if (!errors) {
      this.repositories.cinemaHall.save(cinemaHall);
    }
    return [cinemaHall, errors];
  }

  createFilm(name, duration) {
    const film = new this.entities.Film(name, duration);
    const errors = this.validate(film);
    if (!errors) {
      this.repositories.film.save(film);
    }
    return [film, errors];
  }
}
