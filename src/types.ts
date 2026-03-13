export interface TableEntry {
  id: string;
  name: string;
  schema: string;
  addedDaysAgo: number;
  isReplicating: boolean;
  historyMode: 'enabled' | 'disabled' | null;
}

export type TabId = 'source' | 'tables' | 'destination';

export interface DeploymentState {
  name: string;
  locked: boolean;
  activeTab: TabId;
  tables: TableEntry[];
  searchQuery: string;
  selectedIds: Set<string>;
}
