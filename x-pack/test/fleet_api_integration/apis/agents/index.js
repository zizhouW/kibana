/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

export default function loadTests({ loadTestFile }) {
  describe('Fleet Endpoints', () => {
    loadTestFile(require.resolve('./delete'));
    loadTestFile(require.resolve('./list'));
    loadTestFile(require.resolve('./unenroll'));
    loadTestFile(require.resolve('./actions'));
    loadTestFile(require.resolve('./upgrade'));
    loadTestFile(require.resolve('./current_upgrades'));
    loadTestFile(require.resolve('./reassign'));
    loadTestFile(require.resolve('./status'));
    loadTestFile(require.resolve('./update'));
  });
}
