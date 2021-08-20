import { v4 as uuid } from 'uuid';
import * as dateFns from 'date-fns';
import { yup } from '../lib/validator.js';
import ApplicationEntity from './ApplicationEntity.js';

export default class Price extends ApplicationEntity {

  static weekendMultiplier = 1.3;

  static schema = yup.object({
    cinemaHall: yup.mixed().required().uniqueness(),
    value: yup.number().strict().required().min(0),
  });

  constructor(cinemaHall, value) {
    super();
    this.id = uuid();
    this.cinemaHall = cinemaHall;
    this.value = value;
  }

  calculateFor(time) {
    return dateFns.isWeekend(time)
      ? this.value * this.constructor.weekendMultiplier
      : this.value;
  }
}

