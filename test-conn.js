const net = require('net');

const client = net.createConnection({ port: 6543, host: 'aws-0-us-east-1.pooler.supabase.com' }, () => {
  console.log('Connected to port 6543!');
  client.end();
});

client.on('error', (err) => {
  console.error('Connection failed:', err.message);
});
