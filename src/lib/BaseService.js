export default class BaseService {
  constructor(repositories) {
    Object.keys(repositories).forEach((name) => {
      this[name] = repositories[name];
    });
  }
}
