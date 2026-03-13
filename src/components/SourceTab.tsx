import { useState } from 'react';
import { FormField, TextInput, SelectInput } from './FormField';
import { Toggle } from './Toggle';
import { StatusBadge } from './StatusBadge';
import './SourceTab.css';

export function SourceTab() {
  const [host, setHost] = useState('db.example.com');
  const [port, setPort] = useState('5432');
  const [database, setDatabase] = useState('production');
  const [schema, setSchema] = useState('public');
  const [username, setUsername] = useState('replication_user');
  const [password, setPassword] = useState('••••••••••••');
  const [sslMode, setSslMode] = useState('require');
  const [useSSH, setUseSSH] = useState(false);
  const [sshHost, setSSHHost] = useState('');
  const [sshPort, setSSHPort] = useState('22');
  const [sshUser, setSSHUser] = useState('');
  const [publicationName, setPublicationName] = useState('artie_publication');
  const [slotName, setSlotName] = useState('artie_slot');

  return (
    <div className="source-tab">
      <div className="source-tab__header">
        <div className="source-tab__header-left">
          <div className="source-tab__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C7.58 2 4 3.79 4 6v12c0 2.21 3.58 4 8 4s8-1.79 8-4V6c0-2.21-3.58-4-8-4z" stroke="#6366f1" strokeWidth="1.5" fill="none" />
              <ellipse cx="12" cy="6" rx="8" ry="4" stroke="#6366f1" strokeWidth="1.5" fill="none" />
              <path d="M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4" stroke="#6366f1" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div>
            <h2 className="source-tab__title">PostgreSQL Connection</h2>
            <p className="source-tab__subtitle">Configure your source database connection</p>
          </div>
        </div>
        <div className="source-tab__header-right">
          <StatusBadge status="connected" label="Connected" />
          <button className="btn btn--outline btn--sm">Test Connection</button>
        </div>
      </div>

      <div className="source-tab__section">
        <h3 className="source-tab__section-title">Connection Details</h3>
        <div className="source-tab__grid">
          <div className="source-tab__grid-wide">
            <FormField label="Host" required>
              <TextInput value={host} onChange={setHost} placeholder="localhost" />
            </FormField>
          </div>
          <FormField label="Port" required>
            <TextInput value={port} onChange={setPort} placeholder="5432" />
          </FormField>
          <FormField label="Database" required>
            <TextInput value={database} onChange={setDatabase} placeholder="mydb" />
          </FormField>
          <FormField label="Schema">
            <TextInput value={schema} onChange={setSchema} placeholder="public" />
          </FormField>
        </div>
      </div>

      <div className="source-tab__divider" />

      <div className="source-tab__section">
        <h3 className="source-tab__section-title">Authentication</h3>
        <div className="source-tab__grid">
          <FormField label="Username" required>
            <TextInput value={username} onChange={setUsername} placeholder="postgres" />
          </FormField>
          <FormField label="Password" required>
            <TextInput value={password} onChange={setPassword} placeholder="••••••••" type="password" />
          </FormField>
          <FormField label="SSL Mode">
            <SelectInput
              value={sslMode}
              onChange={setSslMode}
              options={[
                { value: 'disable', label: 'Disable' },
                { value: 'allow', label: 'Allow' },
                { value: 'prefer', label: 'Prefer' },
                { value: 'require', label: 'Require' },
                { value: 'verify-ca', label: 'Verify CA' },
                { value: 'verify-full', label: 'Verify Full' },
              ]}
            />
          </FormField>
        </div>
      </div>

      <div className="source-tab__divider" />

      <div className="source-tab__section">
        <div className="source-tab__section-header">
          <h3 className="source-tab__section-title">SSH Tunnel</h3>
          <Toggle checked={useSSH} onChange={setUseSSH} />
        </div>
        {useSSH && (
          <div className="source-tab__grid">
            <FormField label="SSH Host" required>
              <TextInput value={sshHost} onChange={setSSHHost} placeholder="bastion.example.com" />
            </FormField>
            <FormField label="SSH Port">
              <TextInput value={sshPort} onChange={setSSHPort} placeholder="22" />
            </FormField>
            <FormField label="SSH User" required>
              <TextInput value={sshUser} onChange={setSSHUser} placeholder="ubuntu" />
            </FormField>
          </div>
        )}
      </div>

      <div className="source-tab__divider" />

      <div className="source-tab__section">
        <h3 className="source-tab__section-title">Replication Settings</h3>
        <div className="source-tab__grid">
          <FormField label="Publication Name" hint="The logical replication publication to use">
            <TextInput value={publicationName} onChange={setPublicationName} placeholder="my_publication" />
          </FormField>
          <FormField label="Replication Slot" hint="The logical replication slot name">
            <TextInput value={slotName} onChange={setSlotName} placeholder="my_slot" />
          </FormField>
        </div>
      </div>
    </div>
  );
}
