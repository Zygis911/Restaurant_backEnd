import { pool } from "../db/postgressConnection.mjs";

const authorsController = {

    createAuthor: async (req, res) => {
        try {
            const {name} = req.body;
            const result = await pool.query('INSERT INTO authors(name) VALUES($1) RETURNING *', [name]);
            const author = result.rows[0];

            res.status(201).json(author)
        } catch (error) {
            res.status(500).json({message: "an error occured...."})
        }
    }
}

export default authorsController;