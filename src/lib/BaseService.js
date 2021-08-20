export default class BaseService {
  constructor(repositories, validate) {
    this.validate = validate;
    Object.keys(repositories).forEach((name) => {
      this[name] = repositories[name];
    });
  }
}
