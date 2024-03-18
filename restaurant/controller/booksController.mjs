import bookModel from "../model/bookModel.mjs";

const booksController = {
    getBooks: async (req, res) => {
        try {
            const books = await bookModel.getBooks()
            res.status(200).json(books)
        } catch (error) {
            res.status(500).json({message: "error appeared"})
        }
    }
}

export default booksController;