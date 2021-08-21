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
    services = app.services;
    repositories = app.repositories;
    const email = 'etst@email.com';
    [user] = services.user.createUser(email);
    [film] = services.cinema.createFilm('first glance', 100);
    [cinemaHall] = services.cinema.createCinemaHall('first', 5, 5);
    services.money.createPrice(cinemaHall.id, 100);
    [filmScreening] = services.money
      .createFilmScreening(film.id, cinemaHall.id, new Date());
  });

  it('createPrice', () => {
    const [price] = services.money.createPrice(cinemaHall.id, 200);
    const expected = {
      value: 200,
    };

    expect(price).toMatchObject(expected);
  });

  it('buyTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.money.buyTicket(user.id, filmScreening.id, place);
    const capitalTransaction = repositories.capitalTransaction.findBy({ ticket });
    const ticketExpected = {
      place,
    };

    expect(ticket).toMatchObject(ticketExpected);
    expect(capitalTransaction).toHaveProperty('ticket', ticket);
  });

  it('buyTicket (errors)', () => {
    const f = () => services.money.buyTicket();

    expect(f).toThrow();
  });

  it('buyTicket with double reservation', () => {
    const place = { row: 5, col: 3 };
    services.money.buyTicket(user.id, filmScreening.id, place);
    const [, errors] = services.money.buyTicket(user.id, filmScreening.id, place);
    const expected = {
      filmScreening: [
        'filmScreening already exists',
      ],
    };
    expect(errors).toMatchObject(expected);
  });

  it('refundTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.money.buyTicket(user.id, filmScreening.id, place);
    const isRefunded = services.money.refundTicket(ticket.id);
    expect(isRefunded).toBe(true);
    expect(ticket).toMatchObject({ _fsm: { state: 'returned' } });

    const capitalTransactions = repositories.capitalTransaction.findAllBy({ ticket });
    expect(capitalTransactions).toHaveLength(2);
    expect(capitalTransactions.reduce((acc, { cost }) => acc + cost, 0)).toBe(0);

    services.money.refundTicket(ticket.id);

    const capitalTransactions2 = repositories.capitalTransaction.findAllBy({ ticket });
    expect(capitalTransactions2).toHaveLength(2);
    expect(capitalTransactions2.reduce((acc, { cost }) => acc + cost, 0)).toBe(0);
  });

  it('createFilmScreening', () => {
    const time = new Date();
    const [localFilmScreening] = services.money.createFilmScreening(film.id, cinemaHall.id, time);

    const expected = {
      // film,
      // cinemaHall,
      time,
    };
    expect(localFilmScreening).toMatchObject(expected);
  });

  it('createFilmScreening (errors)', () => {
    const f = () => services.money.createFilmScreening();
    expect(f).toThrow();
  });
});

