import faker from 'faker';
import vest from '../..';

import Context from '../../core/Context';

import { ERROR_HOOK_CALLED_OUTSIDE } from '../constants';
import { ERROR_OUTSIDE_OF_TEST } from './constants';

const { validate, test, warn } = vest;

describe('warn hook', () => {
  describe('When currentTest exists', () => {
    it('Should set isWarning to true', () => {
      let beforeWarn, afterWarn;
      validate(faker.random.word(), () => {
        test(faker.lorem.word(), faker.lorem.sentence(), () => {
          beforeWarn = Context.use().currentTest.isWarning;
          warn();
          afterWarn = Context.use().currentTest.isWarning;
        });
      });

      expect(beforeWarn).toBe(false);
      expect(afterWarn).toBe(true);
    });
  });

  describe('Error handling', () => {
    let warn, validate;

    beforeEach(() => {
      ({ validate, warn } = require('../..'));
    });

    it('Should throw error when currentTest is not present', () => {
      const done = jest.fn();
      validate(faker.random.word(), () => {
        expect(warn).toThrow(ERROR_OUTSIDE_OF_TEST);
        done();
      });
      expect(done).toHaveBeenCalled();
    });

    it('Should throw error when no suite present', () => {
      expect(warn).toThrow(ERROR_HOOK_CALLED_OUTSIDE);
    });
  });
});
