import { v4 as uuid } from 'uuid';
import StateMachine from 'javascript-state-machine';
import { yup } from '../../lib/validator.js';
import ApplicationEntity from '../ApplicationEntity.js';

export default class FilmScreeningTicket extends ApplicationEntity {
  static schema = yup.object({
    filmScreening: yup.mixed().required()
      .uniqueness({
        scope: ['place'], conditions: { _fsm: { state: 'active' } },
      }),
    user: yup.mixed().required(),
    place: yup.mixed().required(),
    cost: yup.number().strict().required().min(0),
  });

  constructor(filmScreening, user, place) {
    super();
    this.id = uuid();
    this.filmScreening = filmScreening;
    this.cost = filmScreening.cost;
    this.user = user;
    this.place = place;
    this.createdAt = new Date();
    this._fsm(); // eslint-disable-line
  }
}

StateMachine.factory(FilmScreeningTicket, {
  init: 'active',
  transitions: [
    { name: 'refund', from: 'active', to: 'returned' },
  ],
});
