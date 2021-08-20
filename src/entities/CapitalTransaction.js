import { v4 as uuid } from 'uuid';
import { yup } from '../lib/validator.js';
import ApplicationEntity from './ApplicationEntity.js';

export default class CapitalTransaction extends ApplicationEntity {
  static scheme = yup.object({
    ticket: yup.mixed().required(),
    cost: yup.number().required(),
  });

  constructor(ticket) {
    super();
    this.id = uuid();
    this.ticket = ticket;
    this.cost = ticket.cost;
    this.createdAt = new Date();
  }
}

