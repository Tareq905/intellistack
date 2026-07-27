const net = require('net');
const { Client } = require('pg');

const regions = [
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2', 'ap-south-1',
  'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-central-1', 'eu-north-1',
  'sa-east-1', 'ca-central-1'
];

async function testRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  const client = new Client({
    connectionString: `postgresql://postgres.dsegoqtjphykxzdrnrji:dummy_pass@${host}:5432/postgres`,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 3000
  });
  
  try {
    await client.connect();
  } catch (err) {
    if (err.message.includes('tenant/user') && err.message.includes('not found')) {
      // Tenant not found on this region's pooler
      return 'not_found';
    } else if (err.message.includes('authentication failed') || err.message.includes('password')) {
      // Found the region! The pooler recognized the tenant but rejected the dummy password.
      return 'found';
    } else {
      return `error: ${err.message}`;
    }
  } finally {
    await client.end().catch(() => {});
  }
}

async function main() {
  console.log('Searching for correct Supabase pooler region...');
  for (const region of regions) {
    process.stdout.write(`Testing ${region}... `);
    const result = await testRegion(region);
    console.log(result);
    if (result === 'found') {
      console.log(`\n🎉 SUCCESS! The correct region is: ${region}`);
      break;
    }
  }
}

main();
