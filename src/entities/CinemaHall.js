import { v4 as uuid } from 'uuid';
import { yup } from '../lib/validator.js';
import ApplicationEntity from './ApplicationEntity.js';

export default class CinemaHall extends ApplicationEntity {
  static schema = yup.object({
    name: yup.string().required(),
    rows: yup.number().required(),
    cols: yup.number().required(),
  });

  constructor(name, rows, cols) {
    super();
    this.id = uuid();
    this.name = name;
    this.rows = rows;
    this.cols = cols;
  }
}
