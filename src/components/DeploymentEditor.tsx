import { useState } from 'react';
import type { TabId } from '../types';
import { Toggle } from './Toggle';
import { Sidebar } from './Sidebar';
import { TablesTab } from './TablesTab';
import { SourceTab } from './SourceTab';
import { DestinationTab } from './DestinationTab';
import './DeploymentEditor.css';

export function DeploymentEditor() {
  const [name, setName] = useState('');
  const [locked, setLocked] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('tables');
  const [activePage, setActivePage] = useState('deployments');

  return (
    <div className="editor">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

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

        <div className="editor__content">
          {activeTab === 'tables' && <TablesTab />}
          {activeTab === 'source' && <SourceTab />}
          {activeTab === 'destination' && <DestinationTab />}
        </div>
      </main>
    </div>
  );
}
