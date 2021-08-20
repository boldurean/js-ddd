import { v4 as uuid } from 'uuid';
import { yup } from '../lib/validator.js';
import ApplicationEntity from './ApplicationEntity.js';

export default class FilmScreening extends ApplicationEntity {
  static schema = yup.object({
    film: yup.mixed().required(),
    cinemaHall: yup.mixed().required(),
    time: yup.mixed().required(),
  });

  constructor(film, cinemaHall, time) {
    super();
    this.id = uuid();
    this.film = film;
    this.cinemaHall = cinemaHall;
    this.time = time;
    this.createdAt = new Date();
  }
}
