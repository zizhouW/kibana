/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { PublicMethodsOf } from '@kbn/utility-types';
import type { SavedObjectsService } from '@kbn/core-saved-objects-browser-internal';
import type { SavedObjectsStart } from '@kbn/core-saved-objects-browser';

type SavedObjectsServiceContract = PublicMethodsOf<SavedObjectsService>;

const createStartContractMock = () => {
  const mock: jest.Mocked<SavedObjectsStart> = {
    client: {
      create: jest.fn(),
      bulkCreate: jest.fn(),
      bulkResolve: jest.fn(),
      bulkUpdate: jest.fn(),
      delete: jest.fn(),
      bulkGet: jest.fn(),
      find: jest.fn(),
      get: jest.fn(),
      resolve: jest.fn(),
      update: jest.fn(),
    },
  };
  return mock;
};

const createMock = () => {
  const mocked: jest.Mocked<SavedObjectsServiceContract> = {
    setup: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
  };
  mocked.start.mockReturnValue(Promise.resolve(createStartContractMock()));
  return mocked;
};

export const savedObjectsServiceMock = {
  create: createMock,
  createStartContract: createStartContractMock,
};
