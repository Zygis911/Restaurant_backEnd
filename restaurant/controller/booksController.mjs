import bookModel from "../model/bookModel.mjs";

const booksController = {
    getBooks: async (req, res) => {
        try {
            const books = await bookModel.getBooks()
            res.status(200).json(books)
        } catch (error) {
            res.status(500).json({message: "error appeared"})
        }
    },

    createBook: async(req, res) => {
        try {
            const book = await bookModel.createBook(req.body);

            res.status(201).json(book)
        } catch (error) {
            if(error.message === 'Author not found') {
               return  res.status(404).json({message: "Author not found"})
                
            }
           res.status(500).json({message: " an error occured while creating the book"})
        }
    },
    
    searchBookByTitle: async (req, res) => {
        try {
            
            const bookTitle = req.query.title
           
            if(!bookTitle) {
                res.status(400).json({message: "title is required"})
                return;
            } 

            const books = await bookModel.searchBooksByTitle(bookTitle);

            if(bookTitle.length === 0) {
                res.status(404).json({message: "book not found no such book"})
                return;
            }


            res.status(200).json(books)

        } catch (error) {
            console.error(error)
        }
    }
}

export default booksController;