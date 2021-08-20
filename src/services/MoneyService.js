import ApplicationService from './ApplicationService.js';

export default class MoneyService extends ApplicationService {
  createPrice(cinemaHallId, value) {
    const cinemaHall = this.repositories.cinemaHall.find(cinemaHallId);
    const price = new this.entities.Price(cinemaHall, value);
    const errors = this.validate(price);
    if (!errors) {
      this.repositories.price.save(price);
    }
    return [price, errors];
  }

  createFilmScreening(filmId, cinemaHallId, time) {
    const film = this.repositories.film.find(filmId);
    const cinemaHall = this.repositories.cinemaHall.find(cinemaHallId);
    const price = this.repositories.price.findBy({ cinemaHall });
    console.log(price);
    const cost = price.calculateFor(time);

    const filmScreening = new this.entities.FilmScreening(film, cinemaHall, time, cost);
    const errors = this.validate(filmScreening);

    if (!errors) {
      this.repositories.filmScreening.save(filmScreening);
    }


    return [filmScreening, errors];
  }

  buyTicket(userId, filmScreeningId, place) {
    const user = this.repositories.user.find(userId);
    const filmScreening = this.repositories.filmScreening.find(filmScreeningId);

    const ticket = new this.entities.FilmScreeningTicket(filmScreening, user, place);
    const errors = this.validate(ticket);

    if (!errors) {
      this.repositories.filmScreeningTicket.save(ticket);
      const capital = new this.entities.CapitalTransaction(ticket);
      this.repositories.capitalTransaction.save(capital);
    }

    return [ticket, errors];
  }
}
