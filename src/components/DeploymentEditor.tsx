import { useState, useCallback } from 'react';
import type { TableEntry, TabId } from '../types';
import { initialTables } from '../data';
import { Toggle } from './Toggle';
import { Logo } from './Logo';
import { SearchIcon } from './SearchIcon';
import { RefreshIcon } from './RefreshIcon';
import './DeploymentEditor.css';

type StatusFilter = 'all' | 'replicating' | 'not-replicating';

export function DeploymentEditor() {
  const [name, setName] = useState('');
  const [locked, setLocked] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('tables');
  const [tables, setTables] = useState<TableEntry[]>(initialTables);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const toggleReplication = useCallback((id: string) => {
    setTables(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        const nowReplicating = !t.isReplicating;
        return {
          ...t,
          isReplicating: nowReplicating,
          historyMode: nowReplicating ? 'disabled' : null,
        };
      })
    );
  }, []);

  const toggleHistoryMode = useCallback((id: string) => {
    setTables(prev =>
      prev.map(t => {
        if (t.id !== id || !t.isReplicating) return t;
        return {
          ...t,
          historyMode: t.historyMode === 'enabled' ? 'disabled' : 'enabled',
        };
      })
    );
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(prev => {
      if (prev.size === tables.length) return new Set();
      return new Set(tables.map(t => t.id));
    });
  }, [tables]);

  const filteredTables = tables.filter(t => {
    const matchesSearch =
      !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.schema.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      statusFilter === 'all' ||
      (statusFilter === 'replicating' && t.isReplicating) ||
      (statusFilter === 'not-replicating' && !t.isReplicating);

    return matchesSearch && matchesFilter;
  });

  const formatAdded = (days: number) =>
    days === 1 ? '1 day ago' : `${days} days ago`;

  return (
    <div className="editor">
      <aside className="editor__sidebar">
        <Logo />
      </aside>

      <main className="editor__main">
        <header className="editor__header">
          <h1 className="editor__title">Edit deployment</h1>
          <div className="editor__header-actions">
            <button className="btn btn--outline">Cancel Editing</button>
            <button className="btn btn--primary">Deploy</button>
          </div>
        </header>

        <div className="editor__name-row">
          <input
            type="text"
            className="editor__name-input"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label className="editor__locked-label">
            <Toggle checked={locked} onChange={setLocked} />
            <span>Locked</span>
          </label>
        </div>

        <nav className="editor__tabs">
          <button
            className={`editor__tab ${activeTab === 'source' ? 'editor__tab--active' : ''}`}
            onClick={() => setActiveTab('source')}
          >
            Source: PostgreSQL
          </button>
          <button
            className={`editor__tab ${activeTab === 'tables' ? 'editor__tab--active' : ''}`}
            onClick={() => setActiveTab('tables')}
          >
            Tables
          </button>
          <button
            className={`editor__tab ${activeTab === 'destination' ? 'editor__tab--active' : ''}`}
            onClick={() => setActiveTab('destination')}
          >
            Destination: Snowflake
          </button>
        </nav>

        {activeTab === 'tables' && (
          <div className="editor__content">
            <div className="editor__toolbar-row">
              <div style={{ flex: 1 }} />
              <button className="btn btn--outline btn--sm">
                <RefreshIcon />
                <span>Refresh</span>
              </button>
            </div>

            <div className="editor__filter-row">
              <div className="editor__search">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="editor__search-input"
                />
              </div>
              <div className="editor__show-filters">
                <span className="editor__show-label">Show:</span>
                <button
                  className={`filter-pill ${statusFilter === 'all' ? 'filter-pill--active' : ''}`}
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </button>
                <button
                  className={`filter-pill ${statusFilter === 'replicating' ? 'filter-pill--active' : ''}`}
                  onClick={() => setStatusFilter('replicating')}
                >
                  Replicating
                </button>
                <button
                  className={`filter-pill ${statusFilter === 'not-replicating' ? 'filter-pill--active' : ''}`}
                  onClick={() => setStatusFilter('not-replicating')}
                >
                  Not replicating
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="data-table__check-col">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === tables.length && tables.length > 0}
                        onChange={toggleSelectAll}
                        className="data-table__checkbox"
                      />
                    </th>
                    <th>Name</th>
                    <th>Schema</th>
                    <th>Added</th>
                    <th>Status</th>
                    <th>History mode</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTables.map(table => (
                    <tr key={table.id} className="data-table__row">
                      <td className="data-table__check-col">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(table.id)}
                          onChange={() => toggleSelect(table.id)}
                          className="data-table__checkbox"
                        />
                      </td>
                      <td className="data-table__name">{table.name}</td>
                      <td className="data-table__schema">{table.schema}</td>
                      <td className="data-table__added">{formatAdded(table.addedDaysAgo)}</td>
                      <td className="data-table__status">
                        <div className="status-cell">
                          <Toggle
                            checked={table.isReplicating}
                            onChange={() => toggleReplication(table.id)}
                          />
                          <span className={table.isReplicating ? 'status--on' : 'status--off'}>
                            {table.isReplicating ? 'Replicating' : 'Not replicating'}
                          </span>
                        </div>
                      </td>
                      <td className="data-table__history">
                        {table.isReplicating && table.historyMode !== null && (
                          <div className="status-cell">
                            <Toggle
                              checked={table.historyMode === 'enabled'}
                              onChange={() => toggleHistoryMode(table.id)}
                            />
                            <span
                              className={
                                table.historyMode === 'enabled'
                                  ? 'status--on'
                                  : 'status--off'
                              }
                            >
                              {table.historyMode === 'enabled' ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'source' && (
          <div className="editor__content">
            <div className="editor__placeholder">
              <h2>Source: PostgreSQL</h2>
              <p>Configure your PostgreSQL source connection settings here.</p>
            </div>
          </div>
        )}

        {activeTab === 'destination' && (
          <div className="editor__content">
            <div className="editor__placeholder">
              <h2>Destination: Snowflake</h2>
              <p>Configure your Snowflake destination settings here.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
