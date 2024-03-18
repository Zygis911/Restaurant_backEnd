import { pool } from "../db/postgressConnection.mjs";

const userModel = {
  getUsers: async (paginate, page, limit) => {
    try {
      if (paginate === "true") {
        const users = await pool.query(
          "SELECT * FROM users OFFSET $1 LIMIT $2",
          [(page - 1) * limit, limit]
        );
        return users.rows;
      } else {
        const users = await pool.query("SELECT * FROM users ORDER BY id");
        return users.rows;
      }
    } catch (error) {
      console.log(error);
    }
  },

  createReservation: async ({ userId, bookId }) => {
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const bookResult = await pool.query("SELECT * FROM books WHERE id = $1", [
      bookId,
    ]);

    const user = userResult.rows[0];
    const book = bookResult.rows[0];

    if (!user || !book) {
      throw new Error("User or book not found");
    }

    const reservationResult = await pool.query(
      "SELECT * FROM reservations WHERE user_id = $1 AND book_id = $2",
      [userId, bookId]
    );

    const reservation = reservationResult.rows[0];

    if (reservation) {
      throw new Error("book is already reserved by a different user");
    }

    if (book.quantity === 0 || !book.available) {
      throw new Error("book is not available");
    }

    await pool.query(
      "INSERT INTO reservations (user_id, book_id) VALUES ($1, $2)",
      [userId, bookId]
    );
    book.quantity--;

    if (book.quantity === 0) {
      book.available = false;
    }

    await pool.query(
      "UPDATE books SET quantity = $1, available = $2 WHERE id = $3",
      [book.quantity, book.available, bookId]
    );

    return { user, book };
  },
};

export default userModel;
