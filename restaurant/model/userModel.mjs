import { pool } from "../db/postgressConnection.mjs";

const userModel = {
  getUsers: async (paginate, page, limit) => {
    try {

      if (paginate === "true") {
        const users = await pool.query('SELECT * FROM users OFFSET $1 LIMIT $2', [(page -1 ) * limit, limit]);
        return users.rows

      } else {
        const users = await pool.query('SELECT * FROM users ORDER BY id')
        return users.rows
      }
    } catch (error) {console.log(error)}
  },
};

export default userModel;
