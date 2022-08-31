/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  logger: {
    log: () => null,
    warn: () => null,
    error: () => null,
  },
});
