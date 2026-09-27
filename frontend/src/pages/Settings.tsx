import React from 'react';
import { Database, Server, Settings as SettingsIcon, Save } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500">Configure models, database connections, and API keys.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
          <SettingsIcon className="w-5 h-5 text-primary mr-2" />
          <h3 className="font-semibold text-slate-800">Model Configuration</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vision-Language Model (Qwen2.5-VL)</label>
            <input type="text" defaultValue="qwen/Qwen2.5-VL-72B-Instruct" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Embedding Model (ColPali)</label>
            <input type="text" defaultValue="vidore/colpali-v1.2" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">LLM (Llama-3)</label>
            <input type="text" defaultValue="meta-llama/Meta-Llama-3-8B-Instruct" className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-sm" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
          <Database className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-slate-800">Database Status</h3>
        </div>
        <div className="p-0">
          <table className="w-full text-sm text-left">
            <tbody className="divide-y divide-slate-200">
              <tr className="bg-white">
                <td className="px-6 py-4 font-medium text-slate-900">PostgreSQL (Metadata)</td>
                <td className="px-6 py-4 text-slate-500">localhost:5432</td>
                <td className="px-6 py-4"><span className="text-green-600 font-medium">Connected</span></td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 font-medium text-slate-900">Qdrant (Vector Store)</td>
                <td className="px-6 py-4 text-slate-500">localhost:6333</td>
                <td className="px-6 py-4"><span className="text-green-600 font-medium">Connected</span></td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-4 font-medium text-slate-900">Neo4j (Knowledge Graph)</td>
                <td className="px-6 py-4 text-slate-500">localhost:7687</td>
                <td className="px-6 py-4"><span className="text-green-600 font-medium">Connected</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary-dark transition-colors">
          <Save className="w-4 h-4 mr-2" /> Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
