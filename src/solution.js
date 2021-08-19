import Film from './Film.js';
import CinemaHall from './CinemaHall.js';
import FilmScreening from './FilmScreening.js';

export default (name, duration, cinemaHallName, rows, cols, time) => {
  const film = new Film(name, duration);
  const hall = new CinemaHall(cinemaHallName, rows, cols);
  return new FilmScreening(film, hall, time);
};
