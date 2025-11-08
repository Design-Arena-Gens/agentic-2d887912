import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testBot = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse('Error testing bot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>WhatsApp Inventory Bot</title>
        <meta name="description" content="WhatsApp chatbot for order and inventory tracking" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ marginBottom: '1rem' }}>📱 WhatsApp Inventory Bot</h1>

        <div style={{ backgroundColor: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Bot Status</h2>
          <p style={{ color: '#22c55e', fontWeight: 'bold' }}>✓ API Running</p>
          <p style={{ marginTop: '0.5rem', color: '#666' }}>Webhook URL: <code>/api/webhook</code></p>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Test Bot</h2>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && testBot()}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
          </div>

          <button
            onClick={testBot}
            disabled={loading || !message.trim()}
            style={{
              backgroundColor: '#0070f3',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Processing...' : 'Send Message'}
          </button>

          {response && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '4px',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
            }}>
              {response}
            </div>
          )}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Setup Instructions</h2>

          <h3 style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>1. Google Sheets Setup</h3>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>Create a Google Sheet with two tabs:</p>
          <ul style={{ marginLeft: '1.5rem', color: '#666' }}>
            <li><strong>Orders</strong>: Columns - OrderID, CustomerName, Status, Date, Items</li>
            <li><strong>Inventory</strong>: Columns - ProductName, SKU, Quantity, Location</li>
          </ul>

          <h3 style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>2. Environment Variables</h3>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>Required variables:</p>
          <ul style={{ marginLeft: '1.5rem', color: '#666' }}>
            <li><code>GOOGLE_SHEET_ID</code>: Your Google Sheet ID</li>
            <li><code>GOOGLE_CREDENTIALS</code>: Service account JSON credentials</li>
          </ul>

          <h3 style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>3. WhatsApp Setup (Twilio)</h3>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>Configure webhook in Twilio:</p>
          <ul style={{ marginLeft: '1.5rem', color: '#666' }}>
            <li>Webhook URL: <code>https://your-domain.vercel.app/api/webhook</code></li>
            <li>Method: POST</li>
          </ul>

          <h3 style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '0.5rem' }}>4. Example Commands</h3>
          <ul style={{ marginLeft: '1.5rem', color: '#666' }}>
            <li>"Check order status ORDER123"</li>
            <li>"Track order #456"</li>
            <li>"Check inventory"</li>
            <li>"Stock of Widget Pro"</li>
          </ul>
        </div>
      </main>
    </>
  );
}
