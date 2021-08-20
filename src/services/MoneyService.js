import ApplicationService from './ApplicationService.js';
import { FilmScreeningTicket } from '../entities/index.js';

export default class MoneyService extends ApplicationService {
  buyTicket(userId, filmScreeningId, place) {
    const user = this.UserRepository.find(userId);
    const filmScreening = this.FilmScreeningRepository.find(filmScreeningId);

    const ticket = new FilmScreeningTicket(filmScreening, user, place);

    const errors = this.validate(ticket);
    if (!errors) {
      this.FilmScreeningTicketRepository.save(ticket);
    }
    return [ticket, errors];
  }
}
