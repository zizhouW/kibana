/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

import { useParams } from 'react-router-dom';

import { useValues } from 'kea';

import { EuiTabbedContent, EuiTabbedContentTab } from '@elastic/eui';

import { i18n } from '@kbn/i18n';
import { useKibana } from '@kbn/kibana-react-plugin/public';

import { Status } from '../../../../../common/types/api';
import { enableIndexTransformsTab } from '../../../../../common/ui_settings_keys';
import { generateEncodedPath } from '../../../shared/encode_path_params';
import { KibanaLogic } from '../../../shared/kibana';
import { FetchIndexApiLogic } from '../../api/index/fetch_index_api_logic';
import { SEARCH_INDEX_PATH, SEARCH_INDEX_TAB_PATH } from '../../routes';
import { isConnectorIndex, isCrawlerIndex } from '../../utils/indices';
import { EnterpriseSearchContentPageTemplate } from '../layout/page_template';

import { baseBreadcrumbs } from '../search_indices';

import { getHeaderActions } from './components/header_actions/header_actions';
import { IndexCreatedCallout } from './components/index_created_callout/callout';
import { IndexCreatedCalloutLogic } from './components/index_created_callout/callout_logic';
import { ConnectorConfiguration } from './connector/connector_configuration';
import { ConnectorSchedulingComponent } from './connector/connector_scheduling';
import { CrawlCustomSettingsFlyout } from './crawler/crawl_custom_settings_flyout/crawl_custom_settings_flyout';
import { SearchIndexDomainManagement } from './crawler/domain_management/domain_management';
import { SearchIndexDocuments } from './documents';
import { SearchIndexIndexMappings } from './index_mappings';
import { IndexNameLogic } from './index_name_logic';
import { SearchIndexOverview } from './overview';

export enum SearchIndexTabId {
  // all indices
  OVERVIEW = 'overview',
  DOCUMENTS = 'documents',
  INDEX_MAPPINGS = 'index_mappings',
  // connector indices
  CONFIGURATION = 'configuration',
  SCHEDULING = 'scheduling',
  TRANSFORMS = 'transforms',
  // crawler indices
  DOMAIN_MANAGEMENT = 'domain_management',
}

export const SearchIndex: React.FC = () => {
  const { data: indexData, status: indexApiStatus } = useValues(FetchIndexApiLogic);
  const { isCalloutVisible } = useValues(IndexCreatedCalloutLogic);
  const { tabId = SearchIndexTabId.OVERVIEW } = useParams<{
    tabId?: string;
  }>();
  const {
    services: { uiSettings },
  } = useKibana();

  const { indexName } = useValues(IndexNameLogic);

  const transformsEnabled = uiSettings?.get<boolean>(enableIndexTransformsTab) ?? false;

  const ALL_INDICES_TABS: EuiTabbedContentTab[] = [
    {
      content: <SearchIndexOverview />,
      id: SearchIndexTabId.OVERVIEW,
      name: i18n.translate('xpack.enterpriseSearch.content.searchIndex.overviewTabLabel', {
        defaultMessage: 'Overview',
      }),
    },
    {
      content: <SearchIndexDocuments />,
      id: SearchIndexTabId.DOCUMENTS,
      name: i18n.translate('xpack.enterpriseSearch.content.searchIndex.documentsTabLabel', {
        defaultMessage: 'Documents',
      }),
    },
    {
      content: <SearchIndexIndexMappings />,
      id: SearchIndexTabId.INDEX_MAPPINGS,
      name: i18n.translate('xpack.enterpriseSearch.content.searchIndex.indexMappingsTabLabel', {
        defaultMessage: 'Index Mappings',
      }),
    },
  ];

  const CONNECTOR_TABS: EuiTabbedContentTab[] = [
    {
      content: <ConnectorConfiguration />,
      id: SearchIndexTabId.CONFIGURATION,
      name: i18n.translate('xpack.enterpriseSearch.content.searchIndex.configurationTabLabel', {
        defaultMessage: 'Configuration',
      }),
    },
    {
      content: <ConnectorSchedulingComponent />,
      id: SearchIndexTabId.SCHEDULING,
      name: i18n.translate('xpack.enterpriseSearch.content.searchIndex.schedulingTabLabel', {
        defaultMessage: 'Scheduling',
      }),
    },
  ];

  const CRAWLER_TABS: EuiTabbedContentTab[] = [
    {
      content: <SearchIndexDomainManagement />,
      id: SearchIndexTabId.DOMAIN_MANAGEMENT,
      name: i18n.translate('xpack.enterpriseSearch.content.searchIndex.domainManagementTabLabel', {
        defaultMessage: 'Manage Domains',
      }),
    },
    {
      content: <ConnectorSchedulingComponent />,
      id: SearchIndexTabId.SCHEDULING,
      name: i18n.translate('xpack.enterpriseSearch.content.searchIndex.schedulingTabLabel', {
        defaultMessage: 'Scheduling',
      }),
    },
  ];

  const TRANSFORMS_TAB: EuiTabbedContentTab[] = [
    {
      content: <div />,
      id: SearchIndexTabId.TRANSFORMS,
      name: i18n.translate('xpack.enterpriseSearch.content.searchIndex.transformsTabLabel', {
        defaultMessage: 'Transforms',
      }),
    },
  ];

  const tabs: EuiTabbedContentTab[] = [
    ...ALL_INDICES_TABS,
    ...(isConnectorIndex(indexData) ? CONNECTOR_TABS : []),
    ...(isCrawlerIndex(indexData) ? CRAWLER_TABS : []),
    ...(transformsEnabled && isConnectorIndex(indexData) ? TRANSFORMS_TAB : []),
  ];

  const selectedTab = tabs.find((tab) => tab.id === tabId);

  const onTabClick = (tab: EuiTabbedContentTab) => {
    KibanaLogic.values.navigateToUrl(
      generateEncodedPath(
        tab.id === SearchIndexTabId.OVERVIEW ? SEARCH_INDEX_PATH : SEARCH_INDEX_TAB_PATH,
        {
          indexName,
          tabId: tab.id,
        }
      )
    );
  };
  return (
    <EnterpriseSearchContentPageTemplate
      pageChrome={[...baseBreadcrumbs, indexName]}
      pageViewTelemetry={tabId}
      isLoading={
        indexApiStatus === Status.IDLE ||
        (typeof indexData === 'undefined' && indexApiStatus === Status.LOADING)
      }
      pageHeader={{
        pageTitle: indexName,
        rightSideItems: getHeaderActions(indexData),
      }}
    >
      <>
        {isCalloutVisible && <IndexCreatedCallout indexName={indexName} />}
        {indexName === indexData?.name && (
          <EuiTabbedContent tabs={tabs} selectedTab={selectedTab} onTabClick={onTabClick} />
        )}
        {isCrawlerIndex(indexData) && <CrawlCustomSettingsFlyout />}
      </>
    </EnterpriseSearchContentPageTemplate>
  );
};
