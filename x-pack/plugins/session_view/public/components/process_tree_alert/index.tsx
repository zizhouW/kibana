/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiBadge, EuiIcon, EuiText, EuiButtonIcon } from '@elastic/eui';
import { ProcessEvent, ProcessEventAlert } from '../../../common/types/process_tree';
import { getBadgeColorFromAlertStatus } from './helpers';
import { useStyles } from './styles';

interface ProcessTreeAlertDeps {
  alert: ProcessEvent;
  isInvestigated: boolean;
  isSelected: boolean;
  onAlertSelected: (alert: ProcessEventAlert | null) => void;
}

export const ProcessTreeAlert = ({
  alert,
  isInvestigated,
  isSelected,
  onAlertSelected,
}: ProcessTreeAlertDeps) => {
  const styles = useStyles({ isInvestigated, isSelected });

  if (!alert.kibana) {
    return null;
  }

  const { uuid, rule, workflow_status: status } = alert.kibana.alert;
  const { name } = rule;

  const handleClick = () => {
    onAlertSelected(alert.kibana?.alert ?? null);
  };

  return (
    <EuiText
      key={uuid}
      size="s"
      css={styles.alert}
      data-test-subj={`sessionView:sessionViewAlertDetail-${uuid}`}
      onClick={handleClick}
    >
      <EuiButtonIcon iconType="expand" aria-label="expand" css={styles.alertRowItem} />
      <EuiIcon type="alert" css={styles.alertRowItem} />
      <EuiText size="s" css={styles.alertRowItem}>
        {name}
      </EuiText>
      <EuiBadge color={getBadgeColorFromAlertStatus(status)} css={styles.alertStatus}>
        {status}
      </EuiBadge>
    </EuiText>
  );
};
