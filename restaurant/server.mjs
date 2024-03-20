import express from "express";
import usersRouter from "./routes/index.mjs";
import cookies from "./middleware/cookies.mjs";
import { connectDB } from "./db/postgressConnection.mjs";
import authorsRouter from './routes/index.mjs'
import booksRouter from './routes/index.mjs'

import passport from './strategeis/auth.mjs'
import dotenv from 'dotenv'
import cors from 'cors'
 
dotenv.config();
// const app = express();

// const startServer = async () => {
//   try {
//     const message = await connectDB();
//     console.log(message);
//     app.use('api/v1/library', usersRouter)

//     const PORT = 3000;

//     app.use(express.json());
//     app.use(cookies);

//     app.listen(PORT, () => {
//       console.log("server is listening on port 3000");
//     });
//   } catch (error) {}
// };

// startServer();


// Server registravimas
const app = express();

// const corsOption = {
//     origin: 'http://localhost:5173/',
// }
 
app.use(cors())

const startServer = async () => {
    try {
        const message = await connectDB()
        console.log(message);

       

        const PORT = 3000

        app.use(cookies)
        app.use(express.json());

        app.use(passport.initialize());
        app.use('/api/v1/library', usersRouter, authorsRouter, booksRouter)

        app.listen(PORT, () => {
            console.log('Server is listening on port 3000')
        });

    } catch (error) {
        console.error('Failed to connect to the server or database', error);
    }
}

startServer()
