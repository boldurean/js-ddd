import cinemaManager from '../../src/index.js';

describe('MoneyService', () => {
  let services;
  let film;
  let cinemaHall;
  let filmScreening;
  let user;
  let repositories;

  beforeEach(() => {
    const app = cinemaManager();
    ({ services, repositories } = app);
    const email = 'etst@email.com';
    [user] = services.userService.createUser(email);
    [film] = services.cinemaService.createFilm('first glance', 100);
    [cinemaHall] = services.cinemaService.createCinemaHall('first', 5, 5);
    services.moneyService.createPrice(cinemaHall.id, 100);
    [filmScreening] = services.moneyService
      .createFilmScreening(film.id, cinemaHall.id, new Date());
    services.moneyService.createPrice(cinemaHall.id, 100);
  });

  it('createPrice', () => {
    const [price] = services.moneyService.createPrice(cinemaHall.id, 200);
    const expected = {
      value: 200,
    };

    expect(price).toMatchObject(expected);
  });

  it('createFilmScreening (errors)', () => {
    const f = () => services.moneyService.createFilmScreening();
    expect(f).toThrow();
  });

  it('createFilmScreening', () => {
    const time = new Date();
    const [localFilmScreening] = services.moneyService
      .createFilmScreening(film.id, cinemaHall.id, time);
    const expected = {
      // film,
      // cinemaHall,
      time,
    };
    expect(localFilmScreening).toMatchObject(expected);
    const fs = repositories.filmScreening.find(localFilmScreening.id);
    expect(localFilmScreening).toMatchObject(fs);
  });

  it('buyTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.moneyService.buyTicket(user.id, filmScreening.id, place);
    const capital = repositories.capitalTransaction.findBy({ ticket });
    const ticketExpected = {
      place,
    };

    expect(ticket).toMatchObject(ticketExpected);

    const capitalExpected = {
      ticket,
    };
    expect(capital).toMatchObject(capitalExpected);
  });

  it('buyTicket (errors)', () => {
    const f = () => services.moneyService.buyTicket();

    expect(f).toThrow();
  });

  it('buyTicket with double reservation', () => {
    const place = { row: 5, col: 3 };
    services.moneyService.buyTicket(user.id, filmScreening.id, place);
    const [, errors] = services.moneyService.buyTicket(user.id, filmScreening.id, place);
    const expected = {
      filmScreening: [
        'filmScreening already exists',
      ],
    };
    expect(errors).toMatchObject(expected);
  });
});

