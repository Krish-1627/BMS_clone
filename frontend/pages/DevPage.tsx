
import React, { useState, useEffect } from 'react';
import { EmailLog, WebhookLog } from '../types.ts';
import { getEmailLogs, getWebhookLogs, addWebhookLog } from '../utils/localStorage.ts';

const DevPage: React.FC = () => {
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);

  useEffect(() => {
    setEmailLogs(getEmailLogs());
    setWebhookLogs(getWebhookLogs());
  }, []);

  const handleSimulateWebhook = () => {
    const newWebhook: WebhookLog = {
      source: 'n8n_simulation',
      payload: {
        message: 'This is a simulated webhook from the dev tools page.',
        bookingId: `sim-${Date.now()}`,
        status: 'confirmed',
      },
      at: new Date().toISOString(),
    };
    addWebhookLog(newWebhook);
    setWebhookLogs(getWebhookLogs()); // Refresh logs
  };

  const LogViewer: React.FC<{ title: string; logs: any[] }> = ({ title, logs }) => (
    <div className="bg-bms-charcoal p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {logs.length === 0 ? (
        <p className="text-gray-500">No logs found.</p>
      ) : (
        <pre className="bg-bms-dark text-sm p-4 rounded-md overflow-x-auto max-h-96">
          {JSON.stringify(logs, null, 2)}
        </pre>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Developer & Integration Tools</h1>

      <div className="bg-bms-charcoal p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Simulate n8n Webhook</h2>
        <p className="text-sm text-gray-400 mb-4">Click this button to add a mock webhook entry to localStorage, as if it came from an n8n workflow.</p>
        <button
          data-test="dev-webhook-trigger"
          onClick={handleSimulateWebhook}
          className="bg-bms-red text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Trigger Webhook
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LogViewer title="Webhook Logs" logs={webhookLogs} />
        <LogViewer title="Email Logs" logs={emailLogs} />
      </div>
    </div>
  );
};

export default DevPage;