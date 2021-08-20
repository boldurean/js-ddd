import { v4 as uuid } from 'uuid';
import { yup } from '../../lib/validator.js';
import ApplicationEntity from '../ApplicationEntity.js';

export default class FilmScreeningTicket extends ApplicationEntity {
  static schema = yup.object({
    filmScreening: yup.mixed().required()
      .uniqueness({ scope: ['place'] }),
    user: yup.mixed().required(),
    place: yup.mixed().required(),
  });

  constructor(filmScreening, user, place) {
    super();
    this.id = uuid();
    this.filmScreening = filmScreening;
    this.user = user;
    this.place = place;
    this.createdAt = new Date();
  }
}
