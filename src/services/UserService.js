import ApplicationService from './ApplicationService.js';

export default class UserService extends ApplicationService {
  createUser(email) {
    const user = new this.entities.User(email);
    const errors = this.validate(user);
    if (!errors) {
      this.repositories.user.save(user);
    }
    return [user, errors];
  }
}
