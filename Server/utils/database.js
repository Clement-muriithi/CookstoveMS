import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: "postgres",
  password:"12345",
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: 'cookstoves'
});

// Function to test the database connection
const testDatabaseConnection = async () => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT $1::text as message', ['Connected to cookstoves database']);
      console.log(result.rows[0].message);
      client.release();
    } catch (error) {
      console.error('Error testing database connection:', error.message);
    }
  };
  export default pool;
  export { testDatabaseConnection };
