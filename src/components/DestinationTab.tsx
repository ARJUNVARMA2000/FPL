import { useState } from 'react';
import { FormField, TextInput, SelectInput } from './FormField';
import { Toggle } from './Toggle';
import { StatusBadge } from './StatusBadge';
import './DestinationTab.css';

export function DestinationTab() {
  const [account, setAccount] = useState('xy12345.us-east-1');
  const [warehouse, setWarehouse] = useState('COMPUTE_WH');
  const [database, setDatabase] = useState('ANALYTICS');
  const [destSchema, setDestSchema] = useState('PUBLIC');
  const [role, setRole] = useState('ACCOUNTADMIN');
  const [username, setUsername] = useState('ARTIE_USER');
  const [password, setPassword] = useState('••••••••••••');
  const [authMethod, setAuthMethod] = useState('password');
  const [autoCreateTables, setAutoCreateTables] = useState(true);
  const [flattenObjects, setFlattenObjects] = useState(false);
  const [bigQueryProject, setBigQueryProject] = useState('');

  return (
    <div className="dest-tab">
      <div className="dest-tab__header">
        <div className="dest-tab__header-left">
          <div className="dest-tab__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L2 9l10 6 10-6-10-6z" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
              <path d="M2 15l10 6 10-6" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
              <path d="M2 9v6" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
              <path d="M22 9v6" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div>
            <h2 className="dest-tab__title">Snowflake Connection</h2>
            <p className="dest-tab__subtitle">Configure your destination data warehouse</p>
          </div>
        </div>
        <div className="dest-tab__header-right">
          <StatusBadge status="connected" label="Connected" />
          <button className="btn btn--outline btn--sm">Test Connection</button>
        </div>
      </div>

      <div className="dest-tab__section">
        <h3 className="dest-tab__section-title">Account Details</h3>
        <div className="dest-tab__grid">
          <div className="dest-tab__grid-wide">
            <FormField label="Account Identifier" required hint="Format: account_id.region.cloud">
              <TextInput value={account} onChange={setAccount} placeholder="xy12345.us-east-1" />
            </FormField>
          </div>
          <FormField label="Warehouse" required>
            <TextInput value={warehouse} onChange={setWarehouse} placeholder="COMPUTE_WH" />
          </FormField>
          <FormField label="Role">
            <TextInput value={role} onChange={setRole} placeholder="ACCOUNTADMIN" />
          </FormField>
          <FormField label="Database" required>
            <TextInput value={database} onChange={setDatabase} placeholder="MY_DB" />
          </FormField>
          <FormField label="Schema">
            <TextInput value={destSchema} onChange={setDestSchema} placeholder="PUBLIC" />
          </FormField>
        </div>
      </div>

      <div className="dest-tab__divider" />

      <div className="dest-tab__section">
        <h3 className="dest-tab__section-title">Authentication</h3>
        <div className="dest-tab__grid">
          <FormField label="Auth Method">
            <SelectInput
              value={authMethod}
              onChange={setAuthMethod}
              options={[
                { value: 'password', label: 'Username & Password' },
                { value: 'keypair', label: 'Key Pair' },
                { value: 'oauth', label: 'OAuth' },
              ]}
            />
          </FormField>
          <FormField label="Username" required>
            <TextInput value={username} onChange={setUsername} placeholder="MY_USER" />
          </FormField>
          {authMethod === 'password' && (
            <FormField label="Password" required>
              <TextInput value={password} onChange={setPassword} placeholder="••••••••" type="password" />
            </FormField>
          )}
          {authMethod === 'keypair' && (
            <FormField label="Private Key Path">
              <TextInput value={bigQueryProject} onChange={setBigQueryProject} placeholder="/path/to/key.pem" />
            </FormField>
          )}
        </div>
      </div>

      <div className="dest-tab__divider" />

      <div className="dest-tab__section">
        <h3 className="dest-tab__section-title">Advanced Settings</h3>
        <div className="dest-tab__settings-list">
          <div className="dest-tab__setting">
            <div className="dest-tab__setting-info">
              <span className="dest-tab__setting-label">Auto-create tables</span>
              <span className="dest-tab__setting-desc">
                Automatically create destination tables if they don't exist
              </span>
            </div>
            <Toggle checked={autoCreateTables} onChange={setAutoCreateTables} />
          </div>
          <div className="dest-tab__setting">
            <div className="dest-tab__setting-info">
              <span className="dest-tab__setting-label">Flatten nested objects</span>
              <span className="dest-tab__setting-desc">
                Flatten JSON/JSONB columns into individual columns
              </span>
            </div>
            <Toggle checked={flattenObjects} onChange={setFlattenObjects} />
          </div>
        </div>
      </div>
    </div>
  );
}
