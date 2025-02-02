/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { File } from '../file';
import { getDownloadHeadersForFile } from './common';

describe('getDownloadHeadersForFile', () => {
  function expectHeaders({
    contentDisposition,
    contentType,
  }: {
    contentDisposition: string;
    contentType: string;
  }) {
    return {
      'content-type': contentType,
      'content-disposition': `attachment; filename="${contentDisposition}"`,
      'cache-control': 'max-age=31536000, immutable',
    };
  }

  const file = { data: { name: 'test', mimeType: undefined } } as unknown as File;
  test('no mime type and name from file object', () => {
    expect(getDownloadHeadersForFile(file, undefined)).toEqual(
      expectHeaders({ contentType: 'application/octet-stream', contentDisposition: 'test' })
    );
  });

  test('no mime type and name (without ext)', () => {
    expect(getDownloadHeadersForFile(file, 'myfile')).toEqual(
      expectHeaders({ contentType: 'application/octet-stream', contentDisposition: 'myfile' })
    );
  });
  test('no mime type and name (with ext)', () => {
    expect(getDownloadHeadersForFile(file, 'myfile.png')).toEqual(
      expectHeaders({ contentType: 'image/png', contentDisposition: 'myfile.png' })
    );
  });
  test('mime type and no name', () => {
    const fileWithMime = { data: { ...file.data, mimeType: 'application/pdf' } } as File;
    expect(getDownloadHeadersForFile(fileWithMime, undefined)).toEqual(
      expectHeaders({ contentType: 'application/pdf', contentDisposition: 'test' })
    );
  });
  test('mime type and name', () => {
    const fileWithMime = { data: { ...file.data, mimeType: 'application/pdf' } } as File;
    expect(getDownloadHeadersForFile(fileWithMime, 'a cool file.pdf')).toEqual(
      expectHeaders({ contentType: 'application/pdf', contentDisposition: 'a cool file.pdf' })
    );
  });
});
