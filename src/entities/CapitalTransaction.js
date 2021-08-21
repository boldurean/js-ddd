import { v4 as uuid } from 'uuid';
import { yup } from '../lib/validator.js';
import ApplicationEntity from './ApplicationEntity.js';

export default class CapitalTransaction extends ApplicationEntity {
  static types = ['income', 'loss'];

  static schema = yup.object({
    ticket: yup.mixed().required(),
    cost: yup.number().strict().required(),
    type: yup.mixed().required().oneOf(CapitalTransaction.types),
  });

  constructor(ticket, type) {
    super();
    this.id = uuid();
    this.ticket = ticket;
    this.type = type;
    this.createdAt = new Date();

    switch (type) {
      case 'income':
        this.cost = ticket.cost;
        break;
      case 'loss':
        this.cost = -ticket.cost;
        break;
    }
  }
}
