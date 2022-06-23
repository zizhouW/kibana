/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { KubernetesCollection } from '../../../types';

const LOGICAL_TREE_VIEW = [
  {
    key: 'orchestrator.cluster.name',
    iconProps: { type: 'heatmap', color: 'success' },
    type: KubernetesCollection.cluster,
    name: 'clusters',
  },
  {
    key: 'orchestrator.namespace',
    iconProps: { type: 'nested', color: 'primary' },
    type: KubernetesCollection.namespace,
    name: 'namespaces',
  },
  {
    key: 'orchestrator.resource.name',
    iconProps: { type: 'package', color: 'warning' },
    type: KubernetesCollection.pod,
    name: 'pods',
  },
  {
    key: 'container.image.name',
    iconProps: { type: 'image', color: 'danger' },
    type: KubernetesCollection.containerImage,
    name: 'container images',
  },
];

const INFRASTRUCTURE_TREE_VIEW = LOGICAL_TREE_VIEW.map((tree, index) => {
  if (index === 1) {
    return {
      key: 'orchestrator.resource.node',
      iconProps: { type: 'node', color: 'primary' },
      type: KubernetesCollection.node,
      name: 'nodes',
    };
  }
  return tree;
});

export const TREE_VIEW = {
  logical: LOGICAL_TREE_VIEW,
  infrastructure: INFRASTRUCTURE_TREE_VIEW,
};

export const INFRASTRUCTURE = 'infrastructure';
export const LOGICAL = 'logical';
