require('dotenv').config();

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const requiredEnv = [
  'TYPEORM_HOST',
  'TYPEORM_PORT',
  'TYPEORM_USERNAME',
  'TYPEORM_PASSWORD',
  'TYPEORM_DATABASE',
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Falta la variable de entorno: ${key}`);
    process.exit(1);
  }
});

const pool = new Pool({
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  user: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

const sqlFilePath = path.join(__dirname, '../database/crosspay_local2.sql');

(async () => {
  try {
    const sql = fs.readFileSync(sqlFilePath, 'utf-8');
    const statements = sql
      .split(/;\s*$/m) // separa por punto y coma
      .map((s) => s.trim())
      .filter(Boolean);

    for (const stmt of statements) {
      await pool.query(stmt);
    }

    console.log('✅ Base de datos cargada con éxito');
    await pool.end();
  } catch (err) {
    console.error('❌ Error cargando la base de datos:', err);
    await pool.end();
    process.exit(1);
  }
})();
