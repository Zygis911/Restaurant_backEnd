// import express from "express";

// import users from "./db/users.json" assert {type: "json"}
// import menus from "./db/menus.json" assert {type: "json"}
// import orders from "./db/orders.json" assert {type: "json"}

// import fs from "fs"
// import path, {dirname} from "path"
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url))
// const router = express.Router();

// router.get('/users', (req, res) => {
//     try {
//         res.status(200).json(users)
//     } catch (error) {
//         res.status(500).json({message: "An error occured while retrieving users"})
//     }
// })



// const app = express();

// const port = 3000;

// app.use(express.json());
// app.get('/', (req, res) => {
//     res.send('Hello world')
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`)
// });
