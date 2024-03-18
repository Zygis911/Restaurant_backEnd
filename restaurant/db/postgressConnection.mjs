import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Library.db",
  password: "retardedretards",
  port: 5432,
});

export const connectDB = () => {
  return new Promise((resolve, reject) => {
    pool.connect((err) => {
      if (err) {
        console.log("connection error", err.stack);
        reject(err);
      } else {
        resolve("database connected successfully ");
      }
    });
  });
};
