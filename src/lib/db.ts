import mysql, {
  Pool,
  RowDataPacket,
  ResultSetHeader,
  Connection,
  OkPacket,
  ProcedureCallPacket,
} from "mysql2/promise";

interface QueryParams {
  query: string;
  values?: any[];
}

// Define supported return types for `q`
type QueryResult =
  | RowDataPacket[]
  | RowDataPacket[][]
  | OkPacket
  | OkPacket[]
  | ResultSetHeader
  | ProcedureCallPacket;

export async function q<T extends QueryResult>({
  query,
  values = [],
}: QueryParams): Promise<T> {
  const connectParams = {
    host: process.env.DB_HOST as string,
    database: process.env.DB_NAME as string,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    // Uncomment if using a socket file:
    // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  };

  let dbconnection: Connection | null = null;
  try {
    // Establish a connection to the database
    dbconnection = await mysql.createConnection(connectParams);

    // Execute the query
    const [results] = await dbconnection.execute<T>(query, values);

    return results;
  } catch (error: any) {
    console.error("Database query error:", error.message);
    throw new Error(error.message);
  } finally {
    // Ensure the connection is closed
    if (dbconnection) {
      await dbconnection.end();
    }
  }
}

export function createPool(): Pool {
  const connectParams = {
    host: process.env.DB_HOST as string,
    database: process.env.DB_NAME as string,
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    connectionLimit: 100, // Pool size
    // Uncomment if using a socket file:
    // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
  };

  // Create and return the connection pool
  return mysql.createPool(connectParams);
}
