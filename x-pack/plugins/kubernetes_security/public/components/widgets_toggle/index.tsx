/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import React from 'react';
import { EuiButtonEmpty } from '@elastic/eui';
import { WIDGET_TOGGLE_SHOW, WIDGET_TOGGLE_HIDE } from '../../../common/translations';
import { useStyles } from './styles';

export const TOGGLE_TEST_ID = 'kubernetesSecurity:widgetToggle';

interface WidgetsToggleDeps {
  shouldHideWidgets?: boolean;
  handleToggleHideWidgets: () => void;
}

export const WidgetsToggle = ({
  shouldHideWidgets = false,
  handleToggleHideWidgets,
}: WidgetsToggleDeps) => {
  const styles = useStyles();
  return (
    <EuiButtonEmpty
      onClick={handleToggleHideWidgets}
      iconType={shouldHideWidgets ? 'eye' : 'eyeClosed'}
      css={styles.widgetToggleButton}
      data-test-subj={TOGGLE_TEST_ID}
    >
      {shouldHideWidgets ? WIDGET_TOGGLE_SHOW : WIDGET_TOGGLE_HIDE}
    </EuiButtonEmpty>
  );
};
