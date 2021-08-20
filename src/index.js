// @ts-check

import Bottle from 'bottlejs';
import _ from 'lodash';
import entities from './entities/index.js';
import generateValidator from './lib/validator.js';
import repositories from './repositories/index.js';
import services from './services/index.js';

export default () => {
  const bottle = new Bottle();
  bottle.factory('repositories', () => {
    return Object.keys(repositories)
      .reduce((acc, repoName) => (
        {
          ...acc,
          [_.lowerFirst(repoName)]: new repositories[repoName]()
        }
      ), {});
  });

  bottle.factory('entities', () => entities);

  // BEGIN (write your solution here)
  bottle.factory('validate', generateValidator);

  bottle.factory('services', (container) => {
    const repositories = container.repositories;
    const entities = container.entities;
    const validate = container.validate;

    return Object.keys(services)
      .reduce((acc, serviceName) => (
        {
          ...acc,
          [_.lowerFirst(serviceName)]: new services[serviceName]({
            repositories,
            entities,
            validate
          })
        }
      ), {});
  });

  return bottle.container;
  // END
};
