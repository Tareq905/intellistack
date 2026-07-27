const fs = require('fs');
const path = require('path');
if (fs.existsSync(path.join(__dirname, '.env'))) {
  const dotenv = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  dotenv.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.\-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = (match[2] || '').trim();
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Attempting to connect to db...');
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Query succeeded! Result:', result);
  } catch (error) {
    console.error('Error details:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
