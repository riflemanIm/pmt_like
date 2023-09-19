import mysql from "mysql2/promise";

export async function q({ query, values = [] }) {
  const connectParams = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,

    //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  };
  //console.log(" ---- ", connectParams, "---");
  const dbconnection = await mysql.createConnection(connectParams);
  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw new Error(error);
  }
}

export function createPool() {
  const connectParams = {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 100,
    //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  };
  return mysql.createPool(connectParams);
}
