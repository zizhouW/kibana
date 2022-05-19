/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useMemo, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  EuiBadge,
  EuiComboBoxOptionOption,
  EuiFlexGroup,
  EuiFlexItem,
  EuiListGroup,
  EuiListGroupItem,
  EuiLoadingContent,
  EuiSpacer,
  EuiTextColor,
} from '@elastic/eui';
import { CSSObject } from '@emotion/react';
import { KUBERNETES_PATH } from '../../../common/constants';
import { KubernetesWidget } from '../kubernetes-widget';
import { AlertsList } from '../alerts-list';
import { SearchFields, SearchGroup } from '../search-group';
import { KubernetesSecurityDeps } from '../../types';

const widgetBadge: CSSObject = {
  position: 'absolute',
  bottom: '16px',
  left: '16px',
  width: 'calc(100% - 32px)',
  fontSize: '12px',
  lineHeight: '18px',
  padding: '4px 8px',
  display: 'flex',
};

const alertsListItem: CSSObject = {
  fontSize: '12px',
  lineHeight: '18px',
  fontWeight: 400,
};

const treeViewContainer: CSSObject = {
  position: 'relative',
  border: '1px solid #D3DAE6',
  borderRadius: '6px',
  padding: '16px',
  height: '500px',
};

const MOCK_CLUSTERS = [
  'test-us-east1-cluster-1',
  'test-us-east1-cluster-2',
  'test-us-east1-cluster-3',
  'test-us-east1-cluster-4',
  'test-us-east1-cluster-5',
  'test-us-east1-cluster-6',
  'test-us-east1-cluster-7',
  'test-us-east1-cluster-8',
];

const GROUP_BY_OPTIONS: Array<EuiComboBoxOptionOption<string>> = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'Namespace',
    value: 'namespace',
  },
  {
    label: 'Node',
    value: 'node',
  },
];

const SORT_BY_OPTIONS: Array<EuiComboBoxOptionOption<string>> = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Date',
    value: 'date',
  },
];

const KubernetesSecurityRoutesComponent = ({ filter }: KubernetesSecurityDeps) => {
  const clusterOptions: Array<EuiComboBoxOptionOption<string>> = useMemo(
    () =>
      MOCK_CLUSTERS.map((cluster) => ({
        label: cluster,
        value: cluster,
      })),
    []
  );
  const [searchFields, setSearchFields] = useState<SearchFields>({
    cluster: clusterOptions[0],
    groupBy: GROUP_BY_OPTIONS.find((groupByOption) => groupByOption.value === 'none'),
    sortBy: SORT_BY_OPTIONS[0],
  });

  return (
    <Switch>
      <Route strict exact path={KUBERNETES_PATH}>
        {filter}
        <EuiFlexGroup>
          <EuiFlexItem grow={3}>
            <KubernetesWidget
              title="Clusters"
              icon="heatmap"
              iconColor="success"
              data={4}
              isAlert={true}
            >
              <EuiBadge
                color="danger"
                href="#"
                target="blank"
                css={{
                  ...widgetBadge,
                  '.euiBadge__content': {
                    width: '100%',
                    '.euiBadge__text': {
                      display: 'flex',
                      justifyContent: 'space-between',
                    },
                  },
                }}
              >
                <div>{'93 alerts '}</div>View alerts
              </EuiBadge>
            </KubernetesWidget>
          </EuiFlexItem>
          <EuiFlexItem grow={3}>
            <KubernetesWidget title="Nodes" icon="node" iconColor="#9170B8" data={16} />
          </EuiFlexItem>
          <EuiFlexItem grow={3}>
            <KubernetesWidget title="Pods" icon="package" iconColor="warning" data={775}>
              <EuiBadge css={{ ...widgetBadge, justifyContent: 'center' }}>
                <EuiTextColor css={{ marginRight: '16px' }} color="success">
                  <span css={{ fontWeight: 700 }}>1000</span>
                  {' live'}
                </EuiTextColor>
                <span css={{ fontWeight: 700 }}>42</span>
                {' disabled'}
              </EuiBadge>
            </KubernetesWidget>
          </EuiFlexItem>
          <EuiFlexItem grow={5}>
            <AlertsList onInspect={() => {}}>
              <EuiListGroup flush gutterSize="none">
                <EuiListGroupItem css={alertsListItem} onClick={() => {}} label="First item" />
                <EuiListGroupItem css={alertsListItem} onClick={() => {}} label="Second item" />
                <EuiListGroupItem css={alertsListItem} onClick={() => {}} label="Third item" />
                <EuiListGroupItem css={alertsListItem} onClick={() => {}} label="Fourth item" />
              </EuiListGroup>
            </AlertsList>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xl" />
        <SearchGroup
          searchFields={searchFields}
          onChange={(updatedSearchFields: SearchFields) => setSearchFields(updatedSearchFields)}
          clusterOptions={clusterOptions}
          groupByOptions={GROUP_BY_OPTIONS}
          sortByOptions={SORT_BY_OPTIONS}
        />
        <EuiSpacer size="m" />
        <div css={treeViewContainer}>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiLoadingContent css={{ width: '300px' }} lines={3} />
              <EuiLoadingContent lines={3} />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiLoadingContent lines={3} />
              <EuiLoadingContent lines={3} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </Route>
    </Switch>
  );
};

export const KubernetesSecurityRoutes = React.memo(KubernetesSecurityRoutesComponent);
// eslint-disable-next-line import/no-default-export
export { KubernetesSecurityRoutes as default };
