'use client';

import { useState } from 'react';

const iconOptions = [
  { name: 'aws', emoji: '☁️', label: 'AWS' },
  { name: 'docker', emoji: '🐳', label: 'Docker' },
  { name: 'kubernetes', emoji: '☸️', label: 'Kubernetes' },
  { name: 'terraform', emoji: '🏗️', label: 'Terraform' },
  { name: 'jenkins', emoji: '🔧', label: 'Jenkins' },
  { name: 'gitlab', emoji: '🦊', label: 'GitLab' },
  { name: 'prometheus', emoji: '📈', label: 'Prometheus' },
  { name: 'grafana', emoji: '📊', label: 'Grafana' },
  { name: 'python', emoji: '🐍', label: 'Python' },
  { name: 'go', emoji: '🐹', label: 'Go' },
  { name: 'linux', emoji: '🐧', label: 'Linux' },
  { name: 'ansible', emoji: '⚙️', label: 'Ansible' },
  { name: 'azure', emoji: '🟦', label: 'Azure' },
  { name: 'gcp', emoji: '🌐', label: 'GCP' },
  { name: 'git', emoji: '📂', label: 'Git' },
  { name: 'github', emoji: '🐙', label: 'GitHub' },
  { name: 'nginx', emoji: '🚂', label: 'Nginx' },
  { name: 'redis', emoji: '🔴', label: 'Redis' },
  { name: 'mongodb', emoji: '🍃', label: 'MongoDB' },
  { name: 'postgresql', emoji: '🐘', label: 'PostgreSQL' },
  { name: 'mysql', emoji: '🐬', label: 'MySQL' },
  { name: 'kafka', emoji: '📨', label: 'Kafka' },
  { name: 'rabbitmq', emoji: '🐇', label: 'RabbitMQ' },
  { name: 'elasticsearch', emoji: '🔍', label: 'Elasticsearch' },
  { name: 'vault', emoji: '🔐', label: 'Vault' },
  { name: 'consul', emoji: '🏛️', label: 'Consul' },
  { name: 'nomad', emoji: '🏃', label: 'Nomad' },
  { name: 'vault', emoji: '🛡️', label: 'Vault' },
  { name: 'helm', emoji: '⚓', label: 'Helm' },
  { name: 'istio', emoji: '🌊', label: 'Istio' },
  { name: 'envoy', emoji: '🚀', label: 'Envoy' },
  { name: 'traefik', emoji: '🚦', label: 'Traefik' },
  { name: 'argocd', emoji: '🔄', label: 'ArgoCD' },
  { name: 'flux', emoji: '💫', label: 'Flux' },
  { name: 'tekton', emoji: '🔧', label: 'Tekton' },
  { name: 'spinnaker', emoji: '🎰', label: 'Spinnaker' },
  { name: 'serverless', emoji: '☁️', label: 'Serverless' },
  { name: 'lambda', emoji: 'λ', label: 'Lambda' },
  { name: 'cloudflare', emoji: '🛡️', label: 'Cloudflare' },
  { name: 'datadog', emoji: '🐶', label: 'Datadog' },
  { name: 'newrelic', emoji: '🆕', label: 'New Relic' },
  { name: 'splunk', emoji: '📊', label: 'Splunk' },
  { name: 'jira', emoji: '📋', label: 'Jira' },
  { name: 'slack', emoji: '💬', label: 'Slack' },
  { name: 'docker', emoji: '📦', label: 'Docker' },
  { name: 'podman', emoji: '🫘', label: 'Podman' },
  { name: 'civo', emoji: '☁️', label: 'Civo' },
  { name: 'digitalocean', emoji: '🌊', label: 'DigitalOcean' },
  { name: 'vultr', emoji: '⚡', label: 'Vultr' },
  { name: 'linode', emoji: '🐧', label: 'Linode' },
  { name: 'default', emoji: '🔧', label: 'Other' },
];

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedIcon = iconOptions.find(i => i.name === value) || iconOptions[iconOptions.length - 1];

  const filteredIcons = iconOptions.filter(i => 
    i.label.toLowerCase().includes(search.toLowerCase()) ||
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <label className="block text-sm text-gray-300 mb-2">Icon</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-left flex items-center gap-3 hover:border-primary transition-colors"
      >
        <span className="text-xl">{selectedIcon.emoji}</span>
        <span className="text-gray-300">{selectedIcon.label}</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-64 overflow-hidden">
          <div className="p-2 border-b border-gray-700">
            <input
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-gray-300 text-sm"
              autoFocus
            />
          </div>
          <div className="p-2 max-h-48 overflow-y-auto">
            {filteredIcons.map((icon) => (
              <button
                key={icon.name}
                type="button"
                onClick={() => {
                  onChange(icon.name);
                  setIsOpen(false);
                  setSearch('');
                }}
                className={`w-full px-3 py-2 rounded flex items-center gap-3 hover:bg-gray-700 transition-colors ${
                  value === icon.name ? 'bg-primary/20 text-primary' : 'text-gray-300'
                }`}
              >
                <span className="text-xl">{icon.emoji}</span>
                <span>{icon.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
