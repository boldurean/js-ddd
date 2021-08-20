// @flow

import cinemaManager from '../src/index.js';

describe('CinemaService', () => {
  let service;
  beforeEach(() => {
    const app = cinemaManager();
    service = app.services.cinema;
  });

  it('createFilm', () => {
    const [film] = service.createFilm('first glance', 100);
    const expected = {
      name: 'first glance',
      duration: 100,
    };
    expect(film).toMatchObject(expected);
  });

  it('createFilm (errors)', () => {
    const [, errors] = service.createFilm();
    const expected = {
      duration: ['duration is a required field'],
      name: ['name is a required field'],
    };
    expect(errors).toMatchObject(expected);
  });

  it('createCinemaHall', () => {
    const [cinemaHall] = service.createCinemaHall('first', 5, 5);
    const expected = {
      name: 'first',
      rows: 5,
      cols: 5,
    };
    expect(cinemaHall).toMatchObject(expected);
  });

  it('createCinemaHall (errors)', () => {
    const [, errors] = service.createCinemaHall();
    const expected = {
      name: ['name is a required field'],
    };
    expect(errors).toMatchObject(expected);
  });

  it('createFilmScreening', () => {
    const time = new Date();
    const [film] = service.createFilm('first glance', 100);
    const [cinemaHall] = service.createCinemaHall('first', 5, 5);
    const [filmScreening] = service.createFilmScreening(film.id, cinemaHall.id, time);

    const expected = {
      film,
      cinemaHall,
      time,
    };
    expect(filmScreening).toMatchObject(expected);
  });

  it('createFilmScreening (errors)', () => {
    const f = () => service.createFilmScreening();
    expect(f).toThrow();
  });
});
