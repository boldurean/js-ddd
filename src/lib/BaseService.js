export default class BaseService {
  constructor({ repositories, entities, validate }) {
    this.repositories = repositories;
    this.entities = entities;
    this.validate = validate;
  }
}
