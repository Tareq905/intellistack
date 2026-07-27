const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres.dsegoqtjphykxzdrnrji:%40tareq...khan@db.dsegoqtjphykxzdrnrji.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  try {
    console.log('Connecting via pg...');
    await client.connect();
    console.log('Connected successfully via pg!');
    const res = await client.query('SELECT 1');
    console.log('Query result:', res.rows);
  } catch (err) {
    console.error('Raw pg error:', err.message, err.code, err.stack);
  } finally {
    await client.end();
  }
}

main();
