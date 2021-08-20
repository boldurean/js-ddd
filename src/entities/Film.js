import { v4 as uuid } from 'uuid';
import ApplicationEntity from './ApplicationEntity.js';
import { yup } from '../lib/validator.js';

export default class Film extends ApplicationEntity {

  static schema = yup.object({
    name: yup.string().required(),
    duration: yup.number().required(),
  });

  constructor(name, duration) {
    super();
    this.id = uuid();
    this.name = name;
    this.duration = duration;
    this.createdAt = new Date();
  }
}
