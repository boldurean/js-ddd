import _ from 'lodash';
import * as yup from 'yup';

import BaseEntity from './BaseEntity';

const toObject = (validationError) => {
  const { inner } = validationError;
  const grouped = _.groupBy(inner, 'path');
  const getMessage = (error) => error.message;
  return _.mapValues(
    grouped,
    (errors) => errors.map(getMessage),
  );
};

yup.addMethod(yup.mixed, 'uniqueness', function method(options) {
  return this.test({
    name: 'uniqueness',
    test(value) {
      if (!value) {
        return true;
      }

      const { path, createError, parent } = this;
      const { repository } = this.options.context;
      const scope = _.get(options, 'scope', []);
      const params = { [path]: value, ..._.pick(parent, scope) };
      const result = repository.findBy(params);
      const isEntity = result instanceof BaseEntity;

      if (result || (isEntity && result.id !== parent.id)) {
        return createError({ message: `${path} already exists` });
      }

      return true;
    },
  });
});

const generateValidator = ({ repositories }) => {
  const entityValidator = (entity) => {
    const { schema } = entity.constructor;
    const className = entity.constructor.name;
    const repository = repositories[_.lowerFirst(className)];

    let errors;
    try {
      schema.validateSync(entity, { abortEarly: false, context: { repository } });
    } catch (err) {
      errors = toObject(err);
    }

    return errors;
  };

  return entityValidator;
};

export default generateValidator;
export { yup };
