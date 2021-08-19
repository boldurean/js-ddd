import { v4 as uuid } from 'uuid';

export default class Film {
  constructor(name, duration) {
    this.id = uuid();
    this.name = name;
    this.duration = duration;
    this.createdAt = new Date();
  }
}
